
'use strict'

import style from './_main.scss'
import fonts from './_fonts.scss'
import script from './app.bundle.js'

function Page (props) {
  return <html lang='en'>
    <meta charset='utf-8'/>
    <title>{props.title}</title>
    <meta name='author' content={props.author}/>
    <meta name='description' content={props.description}/>
    <meta name='viewport' content={props.viewport}/>
    <link rel='icon' href='/logo.svg'/>
    <body>
      <noscript>Please enable JavaScript and try again.</noscript>
      <div id='pocket'></div>
      <script type='module'>{'<!-- xxx -->' + script}</script>
      <style>{'<!-- xxx -->' + style}</style>
      <style>{'<!-- xxx -->' + fonts}</style>
    </body>
  </html>
}

const desc = 'Pocket is a library for building small applications and' +
  ' universal components that can be rendered by any framework that uses' +
  ' hyperscript functions or JSX. Like many frameworks, it provides a' +
  ' component-based model to create interfaces combined with state' +
  ' management, page routing, and style encapsulation.'

const html = Page({
  title: 'Pocket Micro Framework',
  author: 'Dustin Dowell',
  description: desc,
  viewport: 'width=device-width,maximum-scale=5'
})

process.stdout.write('<!DOCTYPE html>' + html)
