import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(() => {
  return {
    server: {
      host: "0.0.0.0",
    },
    plugins: [vue()],
  };
});
