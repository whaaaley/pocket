
import path from 'node:path'

import mdx from '@mdx-js/esbuild'
import rehypePrism from '@mapbox/rehype-prism'

import javascript from './plugins/javascript.js'
import resolution from './plugins/resolution.js'
import sass from './plugins/sass.js'

import helpers from './sass-functions/helpers.js'
import oklab from './sass-functions/oklab.js'
import tabler from './sass-functions/tabler.js'

const production = process.env.NODE_ENV === 'production'
const baseDir = path.join(process.cwd(), './src')

const sassPluginOptions = {
  sass: {
    sourceMap: true,
    sourceMapIncludeSources: true,
    functions: {
      ...helpers,
      ...oklab,
      ...tabler
    }
  },
  cleancss: {
    level: 2
  }
}

const javascriptPluginOptions = {
  esbuild: {
    bundle: true,
    incremental: !production,
    jsxFactory: 'jsx',
    jsxFragment: 'jsxFragment',
    sourcemap: !production,
    write: false,
    define: {
      'process.env.FF_QUIET': true,
      'process.env.NODE_ENV': JSON.stringify(production
        ? 'production'
        : 'development')
    },
    inject: [
      './src/modules/superstatic/src/jsx-pragma.js'
    ],
    loader: {
      '.js': 'jsx'
    },
    plugins: [
      resolution({
        home: baseDir
      }),
      mdx({
        development: !production,
        jsxRuntime: 'classic',
        pragma: 'jsx.jsx',
        pragmaFrag: 'jsx.jsxFragment',
        pragmaImportSource: path.join(
          process.cwd(),
          './src/modules/superstatic/src/jsx-pragma.js'
        ),
        rehypePlugins: [
          rehypePrism
        ]
      }),
      sass({
        ...sassPluginOptions
      })
    ]
  },
  // babel: {
  //   sourceMaps: 'inline',
  //   plugins: [
  //     '@babel/plugin-syntax-jsx',
  //     'babel-plugin-preval'
  //   ],
  //   caller: {
  //     name: 'plugin-babel',
  //     supportsStaticESM: true
  //   }
  // },
  typescript: {
    compilerOptions: {
      allowJs: true,
      lib: [
        'DOM',
        'ESNext'
      ],
      target: 'ESNext'
    }
  },
  uglify: {
    toplevel: true,
    compress: {
      drop_console: true,
      passes: 3
    },
    mangle: {
      toplevel: true
    }
  }
}

export default {
  lib: {
    // bundle: true,
    // format: 'esm',
    // outdir: './lib',
    // define: {
    //   'process.env.FF_QUIET': true,
    //   'process.env.NODE_ENV': 'production'
    // },
    // entryPoints: [
    //   './src/modules/pocket/index.js',
    //   './src/modules/pocket-superfine/index.js'
    // ],
    // plugins: [
    //   resolution({ home: baseDir })
    // ]
  },
  main: {
    bundle: true,
    incremental: !production,
    jsxFactory: 'jsxStatic',
    jsxFragment: 'jsxFragment',
    // minifiy: production,
    platform: 'node',
    write: false,
    entryPoints: [
      './src/index.js'
    ],
    inject: [
      './src/modules/superstatic/src/jsx-pragma.js'
    ],
    loader: {
      '.js': 'jsx',
      '.bundle.js': 'text'
    },
    plugins: [
      javascript({
        ...javascriptPluginOptions
      }),
      sass({
        ...sassPluginOptions
      })
    ]
  }
}
