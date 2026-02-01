import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from 'path'
import { copyFileSync } from 'fs'

// Plugin to copy index.html to 404.html for SPA routing on GitHub Pages
const copy404Plugin = () => ({
  name: 'copy-404',
  closeBundle() {
    const distPath = path.resolve(__dirname, 'dist')
    copyFileSync(
      path.join(distPath, 'index.html'),
      path.join(distPath, '404.html')
    )
    console.log('Copied index.html to 404.html for SPA routing')
  }
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
    copy404Plugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
