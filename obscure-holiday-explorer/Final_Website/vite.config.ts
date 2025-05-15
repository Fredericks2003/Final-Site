import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Configuration to handle possible HMR issues on Windows
export default defineConfig({
  plugins: [
    svelte({
      hot: {
        enabled: false // Completely disable HMR functionality
      }
    })
  ]
})