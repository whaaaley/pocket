
import sass from 'sass'
import { convertOklabToRgb } from 'culori'

function minmax (value) {
  return value < 0 ? 0 : value > 255 ? 255 : value
}

export default {
  'oklab($l, $a, $b)': function ([l, a, b]) {
    const { r: red, g: green, b: blue } = convertOklabToRgb({
      mode: 'oklab',
      l: l.assertNumber('l').value,
      a: a.assertNumber('a').value,
      b: b.assertNumber('b').value
    })

    return sass.SassColor({
      red: minmax(red),
      green: minmax(green),
      blue: minmax(blue)
    })
  }
}
