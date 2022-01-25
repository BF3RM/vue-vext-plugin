import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts';

import pkg from './package.json'

const defaultOptions = {
    input: 'src/index.ts',
    external: [
        ...Object.keys(pkg.devDependencies)
    ],
    plugins: [
        typescript(),
        commonjs(),
        nodeResolve()
    ]
}

export default [{
    ...defaultOptions,
    output: {
        dir: 'dist/esm',
        format: 'esm'
    }
}, {
    ...defaultOptions,
    output: {
        dir: 'dist/cjs',
        format: 'cjs'
    }
}, {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.d.ts',
        format: 'es'
    },
    plugins: [dts()]
}]