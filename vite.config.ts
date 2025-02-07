import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  test: {
    globals: true, // Global testing utilities (like `expect`)
    environment: "jsdom", // Use jsdom as a browser-like environment
    setupFiles: "./src/__tests__/setupTests.ts",
  },
});
