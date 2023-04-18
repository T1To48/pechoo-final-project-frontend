import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    env: {
      VITE_BING_API_KEY: process.env.VITE_BING_API_KEY
    }
  },
  server:{
    host:true
  }
})
