import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  // ESM (index.js + index.d.ts) and CommonJS (index.cjs + index.d.cts).
  format: ['esm', 'cjs'],
  platform: 'neutral',
  target: 'es2020',
  dts: { sourcemap: true },
  minify: true,
  sourcemap: true,
  clean: true,
  // Same CommonJS shape as 1.0.x: require(...).default is the skidder instance.
  outputOptions: { exports: 'named' },
});
