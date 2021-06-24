import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const input = ['src/index.ts'];

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input,
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, babelHelpers: 'bundled' }),
    terser(),
  ],
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
};
