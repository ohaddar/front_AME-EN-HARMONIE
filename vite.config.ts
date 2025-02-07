import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslintPlugin()],
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
