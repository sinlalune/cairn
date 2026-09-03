import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Published under the repository's GitHub Pages path; `SITE_BASE` overrides
// it for a dedicated server.
export default defineConfig({
  base: process.env.SITE_BASE ?? '/cairn/',
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true }
})
