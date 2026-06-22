import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glslify from 'rollup-plugin-glslify'

export default defineConfig({
  plugins: [react(), glslify()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
})
