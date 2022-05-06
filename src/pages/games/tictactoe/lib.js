
export function chickenDinner (matrix) {
  const size = matrix.length // assume that matrix is a square
  const tests = []

  //
  // add rows to tests
  //

  for (let i = 0; i < size; i++) {
    tests.push(matrix[i])
  }

  //
  // add columns to tests
  //

  for (let i = 0; i < size; i++) {
    const col = []

    for (let j = 0; j < size; j++) {
      col.push(matrix[j][i])
    }

    tests.push(col)
  }

  //
  // add first diagnol to tests
  //

  const diagnolFirst = []

  for (let i = 0; i < size; i++) {
    diagnolFirst.push(matrix[i][i])
  }

  tests.push(diagnolFirst)

  //
  // add last diagnol to tests
  //

  const diagnolLast = []

  for (let i = 0; i < size; i++) {
    diagnolLast.push(matrix[i][size - 1 - i])
  }

  tests.push(diagnolLast)

  //
  // check for winners
  //

  for (let i = 0; i < tests.length; i++) {
    const arr = tests[i]
    const player = arr[0]

    const hasWinner = arr.every(function (cell) {
      return cell === null ? false : cell === player
    })

    if (hasWinner) {
      return player
    }
  }
}

export function generateMatrix (size) {
  const matrix = []

  for (let i = 0; i < size; i++) {
    matrix[i] = []

    for (let j = 0; j < size; j++) {
      matrix[i][j] = null
    }
  }

  return matrix
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function randomLetter (exclude) {
  const letters = alphabet.split('').filter(function (letter) {
    return exclude.indexOf(letter) === -1
  })

  return letters[Math.floor(Math.random() * letters.length)]
}
