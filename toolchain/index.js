
'use strict'

import * as fs from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import esbuild from 'esbuild'
import server from './server/index.js'
import config from './config.js'

import './lint.js'

async function build () {
  const bundle = await esbuild.build(config.main)
  const input = Buffer.from(bundle.outputFiles[0].contents.buffer)

  await fs.writeFile('./deploy/dist/index.html', spawnSync('node', { input }).stdout)
  console.log('🎉 Done Building!')
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
