---
type: Cairn Module Note
title: The site
description: What lives under site/ — the React Markdown renderer with Mermaid that publishes the manifesto, the README, the specification and the skills to GitHub Pages — how it is built, and what it deliberately is not.
tags: [module, cairn, site]
timestamp: 2026-09-02T00:00:00Z
---

# The site

`site/` is the second implemented area: a small React application that
renders the repository's own Markdown — `manifesto.md`, `README.md`, `spec/**`
and `skills/**` — in a browser, with Mermaid diagrams rendered from
```` ```mermaid ```` fences. It is a projection: nothing is written for the
site that is not already a document in the repository.

## Flow

`build-content.mjs` walks the repository and bundles the documents into
`src/content.json` with the release and the commit; Vite builds the
application; the app routes by hash (`#/spec/index.md`), resolves relative
links between bundled documents into routes and every other relative link
into the repository on the forge at the bundled commit, strips frontmatter
and reads its title for the navigation. The navigation follows the four
layers the owner asked for: the manifesto, the overview and quick starts, the
specification for those who dig, and the skills.

## Boundaries

The site has dependencies — React, react-markdown, remark-gfm, mermaid, Vite
— and the tools do not: the site is a reader, and the checker must run
anywhere Node runs. The site is not in the kit and not in the checker's link
corpus; it reads the corpus the checker already checks. `.github/workflows/site.yml`
builds and deploys it to GitHub Pages on every push to the trunk; `SITE_BASE`
rebases it for a dedicated server.

## Tests

`npm run build` in `site/` is the test: the bundle must contain every document
and the build must succeed. Rendering is judged by eye at the deployed URL;
there is no snapshot suite, because a renderer of prose has no predicate that
prose does not already satisfy.
