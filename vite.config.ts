import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/images",
          dest: "assets",
        },
      ],
    }),
  ],
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setupTests.ts",
  },
});
