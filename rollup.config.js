import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'src/entry.tsx',
    output: {
      file: 'dist/modheader.min.js',
      name: 'modheader',
      format: 'umd',
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      url(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      uglify({
        output: { comments: false },
        compress: {},
      }),
    ],
  },
];
