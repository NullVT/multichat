import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  // no clue why I have to do this despite the docs saying it should be automatic
  base: process.env.BASE_URL,

  plugins: [vue()],

  server: {
    port: 3000,
    cors: true,
  },
});
