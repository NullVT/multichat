import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 * Additonal output paths for GH Pages
 */
const additionOutputPaths = ["oauth/twitch"];

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
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "dist/index.html"),
          dest: ".",
          rename: () => "404.html",
        },
        ...additionOutputPaths.map((dest) => ({
          src: resolve(__dirname, "dist/index.html"),
          dest,
        })),
      ],
    }),
  ],
});
