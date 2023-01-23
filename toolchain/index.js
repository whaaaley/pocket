
'use strict'

import { writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { exit } from 'node:process'

import esbuild from 'esbuild'
import server from './server/index.js'
import config from './config.js'

import './lint.js'

async function build () {
  const bundle = await esbuild.build(config.main)
  const input = Buffer.from(bundle.outputFiles[0].contents.buffer)

  await writeFile('./deploy/dist/index.html', spawnSync('node', { input }).stdout)
  console.log('🎉 Done Building!')

  // Note: There's some weird thing going on with async functions and child
  // processes. I don't really know what it's about, but everything is done so
  // it's safe to exit.
  exit()
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
