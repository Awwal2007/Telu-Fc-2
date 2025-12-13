import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import ssg from 'vite-plugin-ssr-ssg'; 

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ssg({ prerender: true })  // call the default function
  ],
  optimizeDeps: {
    include: ["swiper"],
  },
});
