
'use strict'

import style from './_main.scss'
import script from './app.bundle.js'

const prismjs = 'https://unpkg.com/prismjs@1.28.0'

function Page (props) {
  return <html lang='en'>
    <meta charset='utf-8'/>
    <title>{props.title}</title>
    <meta name='author' content={props.author}/>
    <meta name='description' content={props.description}/>
    <meta name='viewport' content={props.viewport}/>
    <link rel='icon' href='/cache/logo.svg'/>
    <style>{'<!-- xxx -->' + style}</style>
    <body>
      <noscript>Please enable JavaScript and try again.</noscript>
      <div id='pocket'></div>
      <script>{'<!-- xxx -->' + script}</script>
      <script src={prismjs + '/components/prism-core.min.js'}></script>
      <script src={prismjs + '/plugins/autoloader/prism-autoloader.min.js'}></script>
    </body>
  </html>
}

// TODO: load prismjs async

const html = Page({
  title: 'Pocket Micro Framework',
  author: 'Dustin Dowell',
  description: '',
  viewport: 'width=device-width,maximum-scale=5'
})

process.stdout.write('<!DOCTYPE html>' + html)
