import { defineConfig } from 'vite';
import { viteObfuscateFile } from 'vite-plugin-obfuscator';
import obfuscator from 'rollup-plugin-javascript-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lix-lottie-base.js',
      formats: ['iife'],
      name: 'LixLottie',
    },
  },
  plugins: [
    obfuscator({
      fileOptions: {
        // Your javascript-obfuscator options here
        // Will be applied on each file separately. Set to `false` to disable
        // See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
      },
      globalOptions: {
        // Your javascript-obfuscator options here
        // Will be applied on the whole bundle. Set to `false` to disable
        // See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
      },
    }),
  ],
});
