import './TicTacToe.css'

let turn = 'X'
let gameOver = false
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

export const initTicTacToe = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = '' // Limpiamos el contenido anterior

  const restartButton = document.createElement('button')
  const statusText = document.createElement('h2')
  statusText.textContent = `Turno: ${turn}`
  restartButton.textContent = 'Reiniciar Juego'
  restartButton.className = 'restart-button'
  restartButton.addEventListener('click', restartGame)

  const gameBoard = document.createElement('div')
  gameBoard.className = 'tic-tac-toe-board'
  gameBoard.addEventListener('click', handleCellClick)

  // Crear las celdas del tablero
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div')
      cell.className = 'tic-tac-toe-cell'
      cell.dataset.row = i
      cell.dataset.col = j
      gameBoard.appendChild(cell)
    }
  }

  divContent.appendChild(statusText)
  divContent.appendChild(gameBoard)
  divContent.appendChild(restartButton)
}

// Manejar clics en las celdas del tablero
const handleCellClick = (e) => {
  if (gameOver) return // Si el juego terminó, no hacer nada más

  const cell = e.target
  const row = cell.dataset.row
  const col = cell.dataset.col

  if (board[row][col] !== '') return // Si la celda ya está ocupada, no hacer nada

  // Marcar la celda con la jugada del jugador actual
  board[row][col] = turn
  cell.textContent = turn

  // Comprobar si hay un ganador
  if (checkWinner()) {
    const statusText = document.querySelector('h2')
    statusText.textContent = `${turn} Gana!`
    gameOver = true
    return
  }

  // Comprobar si hay empate
  if (checkDraw()) {
    const statusText = document.querySelector('h2')
    statusText.textContent = '¡Empate!'
    gameOver = true
    return
  }

  // Cambiar de turno
  turn = turn === 'X' ? 'O' : 'X'
  const statusText = document.querySelector('h2')
  statusText.textContent = `Turno: ${turn}`
}

// Comprobar si hay un ganador
const checkWinner = () => {
  // Comprobar filas, columnas y diagonales
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ''
    )
      return true // filas
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ''
    )
      return true // columnas
  }
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ''
  )
    return true // diagonal principal
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ''
  )
    return true // diagonal secundaria

  return false
}

// Comprobar si hay empate
const checkDraw = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false // Hay una celda vacía, por lo que no es empate
      }
    }
  }
  return true // Si todas las celdas están llenas y no hay ganador, es empate
}

// Reiniciar el juego
const restartGame = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  turn = 'X'
  gameOver = false
  const statusText = document.querySelector('h2')
  statusText.textContent = `Turno: ${turn}`

  const cells = document.querySelectorAll('.tic-tac-toe-cell')
  cells.forEach((cell) => {
    cell.textContent = ''
  })
}
