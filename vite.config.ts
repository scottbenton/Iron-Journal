import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
