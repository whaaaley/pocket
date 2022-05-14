
'use strict'

import fs from 'fs'
import { spawnSync } from 'child_process'
import esbuild from 'esbuild'
import server from './server/index.js'
import config from './config.js'

async function build () {
  const bundle = await esbuild.build(config.main)
  const input = Buffer.from(bundle.outputFiles[0].contents.buffer)

  fs.writeFileSync('./deploy/dist/index.html', spawnSync('node', { input }).stdout)
}

function start () {
  server({
    port: 3000,
    extensions: ['.js', '.jsx', '.md', '.mdx', '.sass', '.scss', '.ts', '.tsx'],
    watchDir: 'src'
  })
}

function lib () {
  esbuild.build(config.lib)
}

const targets = { build, start, lib }
targets[process.argv[2]]()
