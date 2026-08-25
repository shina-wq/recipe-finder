import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { reactClickToComponent } from "vite-plugin-react-click-to-component"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    reactClickToComponent(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})