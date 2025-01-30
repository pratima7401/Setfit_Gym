import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // If you're using Vue
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    vue(), // Only if you're using Vue
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
