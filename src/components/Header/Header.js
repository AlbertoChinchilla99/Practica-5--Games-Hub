import { initMole } from '../../pages/Guac-a-Mole/Guac-a-Mole'
import { initTicTacToe } from '../../pages/TicTacToe/TicTacToe' // Importamos la función para iniciar el juego de Tres en Raya
import { initRockPaperScissors } from '../../pages/RockPaperScissors/RockPaperScissors' // Importamos la función para iniciar Piedra, Papel o Tijera
import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')

  const buttonWhack = document.createElement('button')
  const buttonTicTacToe = document.createElement('button') // Botón para Tres en Raya
  const buttonRockPaperScissors = document.createElement('button') // Botón para Piedra, Papel o Tijera

  buttonWhack.textContent = 'Guac a Mole'
  buttonTicTacToe.textContent = 'Tres en Raya' // Texto del botón
  buttonRockPaperScissors.textContent = 'Piedra, Papel o Tijera' // Texto del botón

  buttonWhack.addEventListener('click', initMole)
  buttonTicTacToe.addEventListener('click', initTicTacToe) // Inicia el juego de Tres en Raya
  buttonRockPaperScissors.addEventListener('click', initRockPaperScissors) // Inicia el juego de Piedra, Papel o Tijera

  header.append(buttonWhack)
  header.append(buttonTicTacToe) // Añadimos el botón de Tres en Raya
  header.append(buttonRockPaperScissors) // Añadimos el botón de Piedra, Papel o Tijera
  divApp.append(header)
}
