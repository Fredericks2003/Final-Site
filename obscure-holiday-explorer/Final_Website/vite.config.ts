import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Simple configuration without HMR options
export default defineConfig({
  plugins: [svelte()]
})