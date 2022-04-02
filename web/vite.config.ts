import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
  }
})