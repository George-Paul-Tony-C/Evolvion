import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  server: {
    // This is the proxy configuration
    proxy: {
    // Any request starting with /api will be proxied
      '/api': {
        // Forward the request to our backend container
        target: 'http://localhost:5000',
        // Important for virtual hosts
        changeOrigin: true,
        // We don't need to rewrite the path, so it will be /api/v1/...
      },
    },
  },
})
