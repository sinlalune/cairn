#!/usr/bin/env node
/**
 * Bundle the documents the site renders — the manifesto, the README, the
 * specification and the skills — into one JSON the app imports. The site is
 * a projection of the repository's Markdown; nothing is written twice.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const SITE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(SITE, '..')

function walk(dir, out = []) {
  for (const entry of readdirSync(join(REPO, dir))) {
    const rel = `${dir}/${entry}`
    if (statSync(join(REPO, rel)).isDirectory()) walk(rel, out)
    else if (entry.endsWith('.md')) out.push(rel)
  }
  return out
}

const files = ['manifesto.md', 'README.md', ...walk('spec'), ...walk('skills')].sort()
const content = {}
for (const file of files) content[file] = readFileSync(join(REPO, file), 'utf8')

let commit = 'unknown'
try { commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim() } catch {}
const release = JSON.parse(readFileSync(join(REPO, 'package.json'), 'utf8')).version

mkdirSync(join(SITE, 'src'), { recursive: true })
writeFileSync(join(SITE, 'src/content.json'), JSON.stringify({ release, commit, files: content }))
console.log(`site — bundled ${files.length} documents at ${release} (${commit.slice(0, 7)})`)
