// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [alpinejs({ entrypoint: '/src/entrypoints/alpine.ts' })],

  vite: {
    plugins: [tailwindcss()]
  }
});