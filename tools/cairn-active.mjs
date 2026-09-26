#!/usr/bin/env node
/**
 * cairn-active — regenerate the live-paths view in ACTIVE.md.
 *
 * The owner's challenge (2026-08-14): "if an agent is merging it can
 * reconstruct those files on the go". Correct — and reconstructing beats
 * locking. Every path already declares its status, branch and base, so the
 * running list is a PROJECTION of those files rather than a source. Since
 * CP-OPS-001 S08, an accepted path declaration lands on the trunk BEFORE its
 * worktree branches. That registration is the missing precondition: without
 * it, this generator can be perfectly current for one checkout while being
 * globally false about sibling branches it cannot see.
 *
 * This matters more since the integrator was removed. With every path merging
 * itself, registration + derivation are what keep the global view complete
 * without giving one person ownership of it.
 *
 * Same doctrine the app already applies to its own views: files hold the
 * state, the view arranges references to it, and closing the view loses
 * nothing.
 *
 * The roadmap register's state cells are the same projection (ADR-031
 * decision 2): a path's `status:` is the one place its state is written.
 *
 *   node tools/cairn-active.mjs           # rewrite the block and the cells
 *   node tools/cairn-active.mjs --check   # exit 1 if the view is stale, say a stale cell; write nothing
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ACTIVE_FILE,
  JOURNAL_DIR,
  PATH_DIR,
  PATHS_BEGIN,
  PATHS_END,
  readFrontmatter,
  unmetDependencies
} from './cairn-check.mjs'
import { REPO, metadataOf } from './cairn-config.mjs'

const LIVE_STATUSES = new Set(['running', 'blocked', 'ready'])

/** The roadmap register, and the one row the kit writes into it. */
export const REGISTER_FILE = `${PATH_DIR}/index.md`
export const INSTALLER_ROW = 'M1 — the first milestone'

/**
 * ADR-008 decision 5: the live view reports a register that still carries the
 * installer's row while any path is REGISTERED — which counts every path
 * record, not the live ones. The adopter's register was untouched after
 * sixteen paths, and by the time anyone looked most of them were `done`; a
 * reading that only counted live paths would have said nothing there, on the
 * repository it was written for.
 *
 * A line, never an exit code: what milestone a project has is the owner's to
 * write. Nothing is said before the first path is registered, where the
 * placeholder is what the kit wrote a minute ago; and a register this checkout
 * could not read is `null`, which is a different fact and is not reported as
 * this one.
 */
export function registerAdvisory({ register, paths }) {
  if (register == null || !(paths >= 1)) return null
  if (!register.includes(INSTALLER_ROW)) return null
  return `cairn-active — the roadmap register still carries the installer's row, \`${INSTALLER_ROW}\`, while ${paths} path${paths === 1 ? ' is' : 's are'} registered: ${REGISTER_FILE}`
}

const PATH_CELL = /^(\[(CP-[^\]]+)\]\([^)]*\))(?:,.*)?$/
const PATH_IDS = /\[(CP-[^\]]+)\]\(/g

/** A path's state as the register writes it: its status, and a done path
 *  dated from its journal entry. */
function phrase({ status, date }) {
  return status === 'done' && date ? `done ${date}` : status
}

/**
 * ADR-031 decision 2: every cell of the register that states a path's state —
 * the milestone table's State column, the state written after a path in a
 * coding-paths table — rewritten from `states` (id → { status, date }). A
 * milestone counts the paths its row names and the ones in the table under
 * the heading that ends with its short name (`Cairn 1.2` owns `### The coding
 * paths of 1.2`), the owner's ruling of 2026-09-25: done when every one is
 * done or archived and one is done — dated by the last, where each done one
 * has a date — and running otherwise, or while a row there has no path yet.
 * A milestone counting no path, or a path with no record, keeps what its
 * author wrote; so does every other column.
 * Cells are split on `|`, which a cell cannot hold.
 */
export function fillRegister(text, states) {
  const lines = text.split('\n')
  const sections = new Map()
  const milestones = []
  let heading = null
  let table = null
  lines.forEach((line, index) => {
    if (/^#+ /.test(line)) heading = line.trim().split(/\s+/).at(-1)
    if (!line.startsWith('|')) {
      table = null
      return
    }
    const parts = line.split('|')
    const cells = parts.slice(1, -1).map((cell) => cell.trim())
    if (!table) {
      const state = cells.indexOf('State')
      const path = cells.indexOf('Path')
      table = cells[0] === 'Milestone' && state !== -1 ? { milestone: true, column: state }
        : path !== -1 ? { milestone: false, column: path, section: heading }
          : { column: -1 }
      return
    }
    if (table.column === -1 || /^:?-+:?$/.test(cells[0])) return
    const cell = cells[table.column]
    if (table.milestone) {
      const named = cells.filter((_, at) => at !== table.column).join('|')
      milestones.push({ index, parts, column: table.column, ids: [...named.matchAll(PATH_IDS)].map((m) => m[1]),
        short: cells[0].split(' — ')[0].trim().split(/\s+/).at(-1) })
      return
    }
    const section = sections.get(table.section) ?? { ids: [], unpathed: false }
    sections.set(table.section, section)
    const named = [...cell.matchAll(PATH_IDS)].map((m) => m[1])
    section.ids.push(...named)
    section.unpathed ||= named.length === 0
    const match = PATH_CELL.exec(cell)
    if (!match || !states.has(match[2])) return
    parts[table.column + 1] = ` ${match[1]}, ${phrase(states.get(match[2]))} `
    lines[index] = parts.join('|')
  })
  for (const { index, parts, column, ids, short } of milestones) {
    const section = sections.get(short) ?? { ids: [], unpathed: false }
    const all = [...ids, ...section.ids]
    if (all.length === 0 || !all.every((id) => states.has(id))) continue
    // An archived path is finished without being delivered: it holds nothing open.
    const found = all.map((id) => states.get(id))
    const done = found.filter(({ status }) => status === 'done')
    const state = !section.unpathed && done.length > 0 && found.every(({ status }) => status === 'done' || status === 'archived')
      ? phrase({ status: 'done', date: done.every(({ date }) => date) ? done.map(({ date }) => date).sort().at(-1) : null })
      : 'running'
    parts[column + 1] = ` ${state} `
    lines[index] = parts.join('|')
  }
  return lines.join('\n')
}

/** Each path's journal date: the entry's file name, the id its metadata
 *  declares — sorted, so a path with two entries is dated by the later. */
function journalDates(dir) {
  if (!existsSync(dir)) return new Map()
  return new Map(readdirSync(dir)
    .filter((file) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(file))
    .sort()
    .map((file) => [metadataOf(readFrontmatter(readFileSync(join(dir, file), 'utf8'))?.data)?.path, file.slice(0, 10)])
    .filter(([id]) => id)
    .map(([id, date]) => [String(id), date]))
}

/** Deterministic by construction: sorted by id, so two people regenerating
 *  from the same path files produce byte-identical output. The last field is
 *  the one edge Cairn keeps between paths, projected: a path is UNBLOCKED when
 *  every path it depends on has reached the trunk, and otherwise the view
 *  names what it waits on — so the next piece of work is a fact the repository
 *  computes, not a judgement repeated in every planning conversation. */
export function renderPaths(paths) {
  if (paths.length === 0) {
    return '- *(no live path)*'
  }
  return paths
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((path) => {
      const waits = path.waitsOn ?? []
      const edge = waits.length === 0 ? 'unblocked' : `waits on ${waits.join(', ')}`
      return `- **${path.id}** — ${path.title} · status \`${path.status}\` · branch \`${path.branch}\` · base \`${path.base}\` · ${edge}`
    })
    .join('\n')
}

export function spliceBlock(text, body) {
  const start = text.indexOf(PATHS_BEGIN)
  const end = text.indexOf(PATHS_END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      `${ACTIVE_FILE}: missing ${PATHS_BEGIN} / ${PATHS_END} markers — the derived block has nowhere to go`
    )
  }
  const head = text.slice(0, start + PATHS_BEGIN.length)
  const tail = text.slice(end)
  return `${head}\n${body}\n${tail}`
}

/** The live paths, and how many records are REGISTERED — which is every path
 *  record, whatever its status, deduped by the id it declares. Both come from
 *  one parse: the statuses map below already holds exactly that set, and a
 *  second loop over the same files would be the same reading written twice. */
export function collectPaths(files) {
  const records = files.map(({ name, text }) => {
    const parsed = readFrontmatter(text)
    return { name, parsed, front: metadataOf(parsed?.data) }
  })
  // Every record's state, live or not: a dependency on a `done` path is met,
  // and only the whole corpus can say so.
  const statuses = new Map(records
    .filter(({ front }) => front?.id)
    .map(({ front }) => [String(front.id), { status: front.status, resolution: front.resolution }]))
  const live = []
  for (const { name, parsed, front } of records) {
    if (!front || !LIVE_STATUSES.has(front.status) || !front.branch) continue
    live.push({
      id: front.id ?? name,
      title: (parsed.data.title ?? '').replace(/^['"]|['"]$/g, '').split(' — ')[0],
      status: front.status,
      branch: front.branch,
      base: front.base_commit ?? 'unpinned',
      waitsOn: unmetDependencies(front, statuses)
    })
  }
  return { live, registered: statuses.size, statuses }
}

function main() {
  const check = process.argv.includes('--check')
  // Two record shapes: the flat `CP-<id>.md` every path used, and the folder
  // `CP-<id>/index.md` a path is born in under ADR-020 decision 4. The view is a
  // projection of declarations, so it has to see both or it silently omits a
  // running path — which is the exact failure trunk registration was added for.
  const files = readdirSync(join(REPO, PATH_DIR), { withFileTypes: true })
    .filter((entry) => entry.name.startsWith('CP-'))
    .map((entry) => (entry.isDirectory()
      ? { name: entry.name, file: join(entry.name, 'index.md') }
      : { name: entry.name.replace(/\.md$/, ''), file: entry.name }))
    .filter((entry) => entry.file.endsWith('.md') && existsSync(join(REPO, PATH_DIR, entry.file)))
    .map(({ name, file }) => ({ name, text: readFileSync(join(REPO, PATH_DIR, file), 'utf8') }))

  const active = join(REPO, ACTIVE_FILE)
  const current = readFileSync(active, 'utf8')
  const { live, registered, statuses } = collectPaths(files)
  const next = spliceBlock(current, renderPaths(live))

  // Said on every invocation, before the view's own line: it reads the
  // register, not whether the view was rewritten, so `--check` reports it too.
  const register = join(REPO, REGISTER_FILE)
  const registerText = existsSync(register) ? readFileSync(register, 'utf8') : null
  const advisory = registerAdvisory({ register: registerText, paths: registered })
  if (advisory) console.log(advisory)

  const dates = journalDates(join(REPO, JOURNAL_DIR))
  const states = new Map([...statuses].map(([id, { status }]) => [id, { status, date: dates.get(id) }]))
  const filled = registerText == null ? null : fillRegister(registerText, states)

  // The register's cells are REPORTED, never refused: ADR-031 rejected a
  // checker rule on them, and the checker's `derived-view` reads this
  // command's exit code — while neither the administrative commit nor the
  // integrating one may carry the register. The exit code is the view's.
  const cells = filled !== registerText
  const view = next !== current
  if (!view && !cells) {
    console.log('cairn-active — running-paths view and register cells already current')
    process.exit(0)
  }
  if (check) {
    if (cells) console.log("cairn-active — the roadmap register's state cells are STALE. Run: npm run cairn-active")
    if (view) console.error('cairn-active — running-paths view is STALE. Run: npm run cairn-active')
    process.exit(view ? 1 : 0)
  }
  for (const [stale, file, text, at] of [[view, active, next, ACTIVE_FILE], [cells, register, filled, REGISTER_FILE]]) {
    if (!stale) continue
    writeFileSync(file, text, 'utf8')
    console.log(`cairn-active — rewrote ${at}`)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
