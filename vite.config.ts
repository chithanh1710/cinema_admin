import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Thư mục xuất bản (mặc định là 'dist')
  },
  server: {
    open: true,
  },
});
