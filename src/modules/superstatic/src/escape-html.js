
/**
 * Escape HTML function derived from:
 * https://github.com/component/escape-html/blob/master/index.js
 */

const matchHtmlRegExp = /["'&<>]/

export default function (string) {
  const str = string + ''
  const match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  let i = 0
  let escape
  let lastIndex = 0
  let html = ''

  for (i = match.index; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 34: escape = '&quot;'; break
      case 38: escape = '&amp;'; break
      case 39: escape = '&#39;'; break
      case 60: escape = '&lt;'; break
      case 62: escape = '&gt;'; break
      default: continue
    }

    if (lastIndex !== i) {
      html += str.substring(lastIndex, i)
    }

    lastIndex = i + 1
    html += escape
  }

  return lastIndex !== i
    ? html + str.substring(lastIndex, i)
    : html
}
