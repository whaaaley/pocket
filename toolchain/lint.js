
import * as fs from 'node:fs/promises'
import path from 'node:path'

import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import watch from './watch.js'

watch('./src', async (eventType, filepath) => {
  const ext = path.extname(filepath)
  let code = await fs.readFile(filepath, 'utf8')

  if (
    ext === '.js' ||
    ext === '.jsx' ||
    ext === '.ts' ||
    ext === '.tsx'
  ) {
    // https://eslint.org/docs/latest/developer-guide/nodejs-api
    const eslint = new ESLint({ fix: true })
    const [eslintResult] = await eslint.lintText(code)

    if (eslintResult.output) {
      code = eslintResult.output
    }
  }

  if (
    ext === '.css' ||
    ext === '.sass' ||
    ext === '.scss'
  ) {
    // https://stylelint.io/user-guide/usage/node-api
    const config = await stylelint.resolveConfig(filepath)
    const stylelintResult = await stylelint.lint({ code, config, fix: true })

    if (stylelintResult.output) {
      // if output is valid JSON then there's an error
      try {
        JSON.parse(stylelintResult.output)
      } catch {
        code = stylelintResult.output
      }
    }
  }

  await fs.writeFile(filepath, code)
  console.log('🎉 Done linting!', filepath)
})
