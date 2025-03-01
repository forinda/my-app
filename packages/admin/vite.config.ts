import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pandacss from "@pandacss/dev/postcss";
import autoprefixer from "autoprefixer";
import { fileURLToPath } from "url";
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [pandacss, autoprefixer],
    },
  },envDir: fileURLToPath(new URL('../../', import.meta.url)),
});
