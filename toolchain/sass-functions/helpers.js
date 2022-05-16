
import sass from 'sass'

export default {
  'color($variable, $alpha: 1)': function ([variable, alpha]) {
    variable = variable.assertString('variable').text
    alpha = alpha.assertNumber('alpha').value

    const fn = alpha === 1 ? 'rgb' : 'rgba'
    const alpha2 = alpha === 1 ? '' : `, ${alpha}`

    return sass.SassString(`${fn}(var(${variable})${alpha2})`, {
      quotes: false
    })
  },
  'between($min, $max)': function ([min, max]) {
    min = min.assertNumber('min').value
    max = max.assertNumber('max').value

    const val = max / 1024 * 100

    return sass.SassString(`clamp(${min}px, ${val}vw, ${max}px)`, {
      quotes: false
    })
  },
  'rgb-string($color)': function ([color]) {
    const { red, green, blue } = color.assertColor('color')

    return sass.SassString([red, green, blue].join(', '), {
      quotes: false
    })
  }
}
