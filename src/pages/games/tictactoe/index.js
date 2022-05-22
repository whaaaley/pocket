
import { Component } from '~/modules/pocket-superfine'
import style from './_tictactoe.scss'

import { chickenDinner, generateMatrix, randomLetter } from './lib.js'

export default function () {
  const state = {
    size: 3,
    matrix: generateMatrix(3),
    players: ['X', 'O'],
    turn: 0,
    winner: null,
    maxPlayers: false
  }

  return Component({
    id: 'tictactoe',
    init: { state, setup },
    styles: [style]
  })
}

function addPlayer (state) {
  const newPlayer = randomLetter(state.players)

  if (newPlayer == null) {
    state.maxPlayers = true
  } else {
    state.players = [...state.players, newPlayer]
  }
}

function removePlayer (state, index) {
  state.players[index] = null
  state.players = state.players.filter(Boolean)
}

function place (state, { x, y }) {
  const { matrix, players, turn } = state

  // already placed
  if (typeof state.matrix[x][y] === 'string') {
    return
  }

  // game over
  if (state.winner) {
    return
  }

  state.matrix[x][y] = players[turn]
  const winner = chickenDinner(matrix)

  if (winner) {
    state.winner = winner
  } else {
    state.turn = (turn + 1 > state.players.length - 1) ? 0 : turn + 1
  }
}

function setSize (state, value) {
  state.size = value
  state.matrix = generateMatrix(value)
  state.winner = null
}

function setup (state) {
  function reset () {
    setSize(state, state.size)
  }

  function plus () {
    setSize(state, state.size + 1)
  }

  function minus () {
    setSize(state, state.size - 1)
  }

  function addPlayer_ () {
    addPlayer(state)
  }

  return function () {
    const { matrix, players, turn, winner } = state
    const nextPlayer = players[turn]

    return <div class='frame'>
      <div class='game'>
        {
          (function () {
            if (typeof winner === 'string') {
              return <h1>
                <span>Player {winner} wins!</span>
                <button class='-reset' onclick={reset}>Play Again</button>
              </h1>
            }

            return <h1>It's {nextPlayer}'s turn to move!</h1>
          })()
        }
        {
          (function () {
            const style = `--board-size: ${matrix.length}`
            const result = []

            for (let x = 0; x < matrix.length; x++) {
              const row = matrix[x]

              for (let y = 0; y < row.length; y++) {
                function play () {
                  place(state, { x, y })
                }

                result.push(<button onclick={play}>
                  <svg viewBox='0 0 24 24'>
                    <text x='50%' y='50%'>{row[y]}</text>
                  </svg>
                </button>)
              }
            }

            return <div class='board' style={style}>{result}</div>
          })()
        }
      </div>
      <div class='sidebar'>
        <h1>The Rules</h1>
        <div class='rule'>
          <h2>Matrix Size: {state.size}</h2>
          <div class='actions'>
            <button class='circle-minus' onclick={minus}></button>
            <button class='circle-plus' onclick={plus}></button>
          </div>
        </div>
        <div class='rule'>
          <h2>Players: {players.length}</h2>
          <div class='actions'>
            <button onclick={addPlayer_}>Add Player</button>
          </div>
        </div>
        {
          players.map(function (player, index) {
            function remove () {
              removePlayer(state, index)
            }

            return <div class='rule'>
              <h3>{player}</h3>
              <div class='actions'>
                <button onclick={remove}>Kick</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}
