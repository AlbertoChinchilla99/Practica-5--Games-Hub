import './RockPaperScissors.css'
export const initRockPaperScissors = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = '' // Limpiar el contenido anterior

  const titulo = document.createElement('h2')
  titulo.textContent = 'Piedra, Papel o Tijera'

  const botones = ['Piedra', 'Papel', 'Tijera']
  const resultado = document.createElement('p')
  resultado.className = 'rps-result'

  const reiniciarButton = document.createElement('button')
  reiniciarButton.textContent = 'Jugar de nuevo'
  reiniciarButton.className = 'rps-restart-button'

  // Crear los botones para seleccionar Piedra, Papel o Tijera
  botones.forEach((eleccion) => {
    const boton = document.createElement('button')
    boton.textContent = eleccion
    boton.className = 'rps-button'
    boton.addEventListener('click', () => jugar(eleccion, resultado))
    divContent.append(boton)
  })

  divContent.append(titulo, resultado, reiniciarButton)

  reiniciarButton.addEventListener('click', reiniciarJuego)
}

// Función para jugar una ronda de Piedra, Papel o Tijera
const jugar = (eleccionUsuario, resultado) => {
  const elecciones = ['Piedra', 'Papel', 'Tijera']
  const eleccionComputadora = elecciones[Math.floor(Math.random() * 3)]

  let mensaje
  if (eleccionUsuario === eleccionComputadora) {
    mensaje = `¡Es un empate! Ambos eligieron ${eleccionUsuario}.`
  } else if (
    (eleccionUsuario === 'Piedra' && eleccionComputadora === 'Tijera') ||
    (eleccionUsuario === 'Papel' && eleccionComputadora === 'Piedra') ||
    (eleccionUsuario === 'Tijera' && eleccionComputadora === 'Papel')
  ) {
    mensaje = `¡Ganaste! ${eleccionUsuario} vence a ${eleccionComputadora}.`
  } else {
    mensaje = `¡Perdiste! ${eleccionComputadora} vence a ${eleccionUsuario}.`
  }

  resultado.textContent = `Computadora eligió: ${eleccionComputadora}. ${mensaje}`
  mostrarBotonReiniciar()
}

// Mostrar el botón para reiniciar el juego
const mostrarBotonReiniciar = () => {
  const reiniciarButton = document.querySelector('.rps-restart-button')
  reiniciarButton.style.display = 'block'
}

// Reiniciar el juego
const reiniciarJuego = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = '' // Limpiar el contenido anterior
  initRockPaperScissors()
}
