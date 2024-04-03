import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";
import {VitePWA} from "vite-plugin-pwa"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths(), VitePWA({registerType:"autoUpdate"})],
  optimizeDeps: {
    // exclude: [
    //   "firebase",
    //   "firebase/app",
    //   "firebase/auth",
    //   "firebase/firestore",
    //   "firebase/analytics",
    // ],
  },
});
