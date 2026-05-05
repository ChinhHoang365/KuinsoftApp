import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      '/ilcapi': {
        target: 'https://cec.kuinsoft.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep original path
      }
    }
  }
})
