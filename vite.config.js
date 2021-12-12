import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // https://github.com/mefechoel/svelte-navigator#im-using-vite-why-am-i-getting-errors-with-svelte-navigator
  optimizeDeps: { exclude: ['svelte-navigator'] },
  build: {
    outDir: 'docs',
  },
  base: '/bookmarks/',
})
