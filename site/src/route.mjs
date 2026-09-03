/** The site's routes and heading anchors, pure so they can be tested outside
 *  a browser. A route is `#/<path>` with an optional `#<fragment>`; a heading's
 *  id is its text slugged the way the checker slugs a `scope_ref` anchor, so
 *  `#definition-of-done` means the same thing in a link, in a record and here. */

export function parseRoute(hash, fallback = 'README.md') {
  const raw = String(hash ?? '').replace(/^#\/?/, '')
  const at = raw.indexOf('#')
  const path = decodeURIComponent(at === -1 ? raw : raw.slice(0, at)) || fallback
  const fragment = at === -1 ? '' : decodeURIComponent(raw.slice(at + 1))
  return { path, fragment }
}

export function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** The text of a heading's children, whatever React made of them. */
export function headingText(children) {
  if (children == null) return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(headingText).join('')
  if (typeof children === 'object' && children.props) return headingText(children.props.children)
  return ''
}
