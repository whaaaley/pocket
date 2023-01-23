
import { defineComponent } from '~/modules/pocket-superfine'
import tictactoeStyles from './_tictactoe.scss'
import { chickenDinner, generateMatrix, randomLetter } from './lib.js'

export default (props, children) => {
  return defineComponent(null, context => {
    context.styles({ tictactoeStyles })

    const state = context.reactive({
      size: 3,
      matrix: generateMatrix(3),
      players: ['X', 'O'],
      turn: 0,
      winner: null,
      maxPlayers: false
    })

    function addPlayer () {
      const newPlayer = randomLetter(state.players)

      if (newPlayer == null) {
        state.maxPlayers = true
      } else {
        state.players = [...state.players, newPlayer]
      }
    }

    function removePlayer (index) {
      state.players[index] = null
      state.players = state.players.filter(Boolean)
    }

    function place ({ x, y }) {
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

    function setSize (value) {
      state.size = value
      state.matrix = generateMatrix(value)
      state.winner = null
    }

    return props => {
      const { matrix, players, turn, winner } = state
      const nextPlayer = players[turn]

      const Winner = () => {
        if (typeof winner === 'string') {
          return <h1>
            <span>Player {winner} wins!</span>
            <button class='-reset' onclick={() => { setSize(state.size) }}>Play Again</button>
          </h1>
        }

        return <h1>It's {nextPlayer}'s turn to move!</h1>
      }

      const Matrix = () => {
        const style = `--board-size: ${matrix.length}`
        const result = []

        for (let x = 0; x < matrix.length; x++) {
          const row = matrix[x]

          for (let y = 0; y < row.length; y++) {
            function play () {
              place({ x, y })
            }

            result.push(<button onclick={play}>
              <svg viewBox='0 0 24 24'>
                <text x='50%' y='50%'>{row[y]}</text>
              </svg>
            </button>)
          }
        }

        return <div class='board' style={style}>{result}</div>
      }

      const Players = () => {
        return players.map((player, index) => {
          return <div class='rule'>
            <h3>{player}</h3>
            <div class='actions'>
              <button onclick={() => { removePlayer(index) }}>Kick</button>
            </div>
          </div>
        })
      }

      return <div key='component-tictactoe' id='tictactoe' class='frame'>
        <div class='game'>
          <Winner/>
          <Matrix/>
        </div>
        <div class='sidebar'>
          <h1>The Rules</h1>
          <div class='rule'>
            <h2>Matrix Size: {state.size}</h2>
            <div class='actions'>
              <button class='circle-minus' onclick={() => { setSize(state.size - 1) }}></button>
              <button class='circle-plus' onclick={() => { setSize(state.size + 1) }}></button>
            </div>
          </div>
          <div class='rule'>
            <h2>Players: {players.length}</h2>
            <div class='actions'>
              <button onclick={() => { addPlayer() }}>Add Player</button>
            </div>
          </div>
          <Players/>
        </div>
      </div>
    }
  })
}
