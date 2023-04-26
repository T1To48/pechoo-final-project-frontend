import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// import basicSsl from "@vitejs/plugin-basic-ssl"
import replace from "@rollup/plugin-replace"



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // basicSsl(),
     VitePWA({ 
    injectRegister: 'auto',
   registerType: 'autoUpdate',
  
   workbox:{
     globPatterns: ['**/*.{js,jsx,css,html,ico,png,svg}'],
     cleanupOutdatedCaches: true
   },
   includeAssets:["favicon.ico","apple-touch-icon.png","mask-icon.png"],
   manifest:{
     name:"PECHOO Tracking APP",
     short_name:"PECHOO",
     description:"App that connects Restaurants with Freelancer Drivers",
     theme_color:"#CD6D0C",
     icons:[
       {
         src:"/icons/192x192-icon.png",
         sizes:"192x192",
         type:"image/png"
       },
       {
         src:"/icons/512x512-icon.png",
         sizes:"512x512",
         type:"image/png"
       },
       {
         src:"/icons/mask-icon.png",
         sizes:"512x512",
         type:"image/png",
         purpose:"any maskable"
       }
     ]
   }

  })
],
  build: { rollupOptions: {
    plugins: [
      replace({
        'process.env.REACT_APP_ENABLE_GEOLOCATION': JSON.stringify(true), // Enable geolocation
      }),
    ],
  },
    env: {
      VITE_BING_API_KEY: process.env.VITE_BING_API_KEY
    }
  },
  server:{
    host:true
  }
})
