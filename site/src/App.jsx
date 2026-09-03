import React, { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import bundle from './content.json'
import { headingText, parseRoute, slug } from './route.mjs'

/** Mermaid is heavy and most pages carry no diagram, so it is loaded the
 *  first time one renders, never up front. */
let mermaidReady = null
function loadMermaid() {
  mermaidReady ??= import('mermaid').then(({ default: mermaid }) => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' })
    return mermaid
  })
  return mermaidReady
}

/** The navigation, in reading order: the four layers the project note asks
 *  for — manifesto, overview and quick starts, the specification for those
 *  who dig, the skills — and the wiki and the reference under the
 *  specification. */
function navigation(files) {
  const has = (p) => files.includes(p)
  const under = (prefix) => files.filter((f) => f.startsWith(prefix) && !f.endsWith('/index.md')).sort()
  return [
    { title: 'Start', items: [has('manifesto.md') && ['manifesto.md', 'Manifesto'], has('README.md') && ['README.md', 'Overview and quick starts']].filter(Boolean) },
    { title: 'Specification', items: [['spec/index.md', 'The specification'], ['spec/concepts/index.md', 'Concept wiki'], ['spec/reference/index.md', 'Reference']] },
    { title: 'Skills', items: under('skills/').filter((f) => f.endsWith('SKILL.md')).map((f) => [f, f.split('/')[1]]) },
    { title: 'Concepts', items: under('spec/concepts/').map((f) => [f, titleOf(files, f)]) },
    { title: 'Reference', items: under('spec/reference/').map((f) => [f, titleOf(files, f)]) }
  ]
}

const frontmatter = (text) => {
  if (!text.startsWith('---\n')) return { meta: {}, body: text }
  const end = text.indexOf('\n---', 4)
  if (end === -1) return { meta: {}, body: text }
  const meta = {}
  for (const line of text.slice(4, end).split('\n')) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (m && !line.startsWith(' ')) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
  return { meta, body: text.slice(end + 4).replace(/^\n+/, '') }
}

function titleOf(files, path) {
  const text = bundle.files[path]
  return frontmatter(text ?? '').meta.title ?? path.split('/').at(-1).replace(/\.md$/, '')
}

/** Resolve a relative link against the current document, into a route when
 *  the target is bundled and into the repository on the forge when it is not. */
function resolveLink(href, from) {
  if (!href || /^[a-z]+:/.test(href) || href.startsWith('#')) return { href, external: /^[a-z]+:/.test(href) }
  const [target, hash] = href.split('#')
  const parts = from.split('/').slice(0, -1)
  for (const segment of target.split('/')) {
    if (segment === '.' || segment === '') continue
    if (segment === '..') parts.pop()
    else parts.push(segment)
  }
  const resolved = parts.join('/')
  if (bundle.files[resolved]) return { href: `#/${resolved}${hash ? `#${hash}` : ''}`, external: false }
  if (bundle.files[`${resolved}/index.md`]) return { href: `#/${resolved}/index.md`, external: false }
  return { href: `https://github.com/sinlalune/cairn/blob/${bundle.commit === 'unknown' ? 'main' : bundle.commit}/${resolved}`, external: true }
}

function Mermaid({ code }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  useEffect(() => {
    let live = true
    const id = `m${Math.random().toString(36).slice(2)}`
    loadMermaid().then((mermaid) => mermaid.render(id, code)).then(({ svg }) => { if (live) setSvg(svg) }).catch((e) => { if (live) setError(String(e)) })
    return () => { live = false }
  }, [code])
  if (error) return <pre className="mermaid-error">{code}</pre>
  return <div className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />
}

function Document({ path, fragment }) {
  const text = bundle.files[path]
  if (!text) return <article><h1>Not here</h1><p>No document at <code>{path}</code>. <a href="#/README.md">Start again</a>.</p></article>
  const { body } = frontmatter(text)
  const heading = (Tag) => ({ children }) => <Tag id={slug(headingText(children))}>{children}</Tag>
  const components = useMemo(() => ({
    h1: heading('h1'), h2: heading('h2'), h3: heading('h3'), h4: heading('h4'), h5: heading('h5'), h6: heading('h6'),
    a: ({ href, children }) => {
      const link = resolveLink(href, path)
      return <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{children}</a>
    },
    code: ({ className, children, ...rest }) => {
      const language = /language-(\w+)/.exec(className ?? '')?.[1]
      if (language === 'mermaid') return <Mermaid code={String(children).replace(/\n$/, '')} />
      return <code className={className} {...rest}>{children}</code>
    }
  }), [path])
  // After the document renders: the requested heading, or the top.
  useEffect(() => {
    const target = fragment ? document.getElementById(fragment) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [path, fragment])
  return (
    <article>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{body}</ReactMarkdown>
      <footer className="source">
        <a href={`https://github.com/sinlalune/cairn/blob/${bundle.commit === 'unknown' ? 'main' : bundle.commit}/${path}`} target="_blank" rel="noreferrer">{path}</a> · release {bundle.release}
      </footer>
    </article>
  )
}

function useRoute() {
  const read = () => parseRoute(window.location.hash)
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export default function App() {
  const { path: route, fragment } = useRoute()
  const files = Object.keys(bundle.files)
  const nav = useMemo(() => navigation(files), [files.length])
  const [open, setOpen] = useState(false)
  return (
    <div className="layout">
      <header className="top">
        <button className="menu" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
        <a className="brand" href="#/README.md">Cairn</a>
        <span className="tagline">the lightest document-driven coding protocol · {bundle.release}</span>
      </header>
      <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
        {nav.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map(([path, label]) => (
                <li key={path}><a className={route === path ? 'current' : ''} href={`#/${path}`}>{label}</a></li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <main><Document path={route} fragment={fragment} /></main>
    </div>
  )
}
