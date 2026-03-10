import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://petice.online",
  base: "/saliny",
  image: { service: sharpImageService() },
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
});
