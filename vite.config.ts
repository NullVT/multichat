import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "node:fs";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  // no clue why I have to do this despite the docs saying it should be automatic
  base: process.env.BASE_URL,

  server: {
    port: 3000,
    cors: true,
  },

  plugins: [
    vue(),
    {
      name: "copy-index-to-404",
      closeBundle: () => {
        const outputDir = resolve(__dirname, "dist");
        copyFileSync(
          resolve(outputDir, "index.html"),
          resolve(outputDir, "404.html")
        );
      },
    },
  ],
});
