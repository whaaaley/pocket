
import sass from 'sass'

export default {
  'rgb-string($color)': function ([color]) {
    const { red, green, blue } = color.assertColor('color')
    return sass.SassString([red, green, blue].join(', '))
  }
}
