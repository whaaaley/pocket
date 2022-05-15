
import sass from 'sass'
import { convertOkhslToOklab, convertOklabToRgb } from 'culori'

function clamp (value) {
  return value < 0 ? 0 : value > 255 ? 255 : Math.round(value * 255)
}

export default {
  'okhsl($h, $s, $l)': function ([h, s, l]) {
    const color = convertOkhslToOklab({
      mode: 'okhsl',
      h: h.assertNumber('h').value,
      s: s.assertNumber('s').value / 100,
      l: l.assertNumber('l').value / 100
    })

    const { r: red, g: green, b: blue } = convertOklabToRgb(color)

    return sass.SassColor({
      red: clamp(red),
      green: clamp(green),
      blue: clamp(blue)
    })
  },
  'oklab($l, $a, $b)': function ([l, a, b]) {
    const { r: red, g: green, b: blue } = convertOklabToRgb({
      mode: 'oklab',
      l: l.assertNumber('l').value,
      a: a.assertNumber('a').value,
      b: b.assertNumber('b').value
    })

    return sass.SassColor({
      red: clamp(red),
      green: clamp(green),
      blue: clamp(blue)
    })
  }
}
