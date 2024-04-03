import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
import {VitePWA} from "vite-plugin-pwa"
// https://vitejs.dev/config/
export default ({mode}) => { 
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
  plugins: [react(), svgr(), tsConfigPaths(), VitePWA({registerType:"autoUpdate", includeAssets: [process.env.VITE_FAVICON_PATH],
      manifest: {
        name: process.env.VITE_TITLE,
        short_name: process.env.VITE_TITLE,
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: process.env.VITE_FAVICON_PATH,
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: process.env.VITE_FAVICON_PATH,
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      }})],
  optimizeDeps: {
    // exclude: [
    //   "firebase",
    //   "firebase/app",
    //   "firebase/auth",
    //   "firebase/firestore",
    //   "firebase/analytics",
    // ],
  },
})
};
