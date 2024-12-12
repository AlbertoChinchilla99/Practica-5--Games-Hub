import './Guac-a-Mole.css'

let COUNT = 0
let intervalo
let pausado = true
let maxScore = localStorage.getItem('maxScore') || 0 // Obtener la puntuación máxima almacenada

export const initMole = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const cesta = document.createElement('img')
  const textoContador = document.createElement('h2')
  const textoMaxScore = document.createElement('h3') // Para mostrar la puntuación máxima
  const audio = document.createElement('audio')
  const botonContainer = document.createElement('div')

  const jugar = document.createElement('button')
  const pausar = document.createElement('button')
  const reiniciar = document.createElement('button')

  textoContador.textContent = COUNT
  textoContador.className = 'contador'

  textoMaxScore.textContent = `Máxima puntuación: ${maxScore}` // Mostrar la puntuación máxima
  textoMaxScore.className = 'max-score'

  cesta.className = 'cesta'
  cesta.src = './assets/guac-a-mole/cesta.png'

  audio.src = './assets/guac-a-mole/pop.mp3'

  jugar.textContent = 'Jugar'
  pausar.textContent = 'Pausar'
  reiniciar.textContent = 'Reiniciar'

  jugar.className = 'boton-aguacate'
  pausar.className = 'boton-aguacate'
  reiniciar.className = 'boton-aguacate'

  botonContainer.className = 'boton-container'

  jugar.addEventListener('click', () => {
    pausado = false
    toggleButton(jugar, pausar)
    iniciarJuego()
  })

  pausar.addEventListener('click', () => {
    pausado = true
    toggleButton(jugar, pausar)
    clearInterval(intervalo)
  })

  reiniciar.addEventListener('click', () => {
    reiniciarJuego()
  })

  toggleButton(jugar, pausar)

  botonContainer.append(jugar, pausar, reiniciar)

  divContent.append(audio, botonContainer, textoContador, textoMaxScore, cesta)
}

// Nueva función para reiniciar el juego
const reiniciarJuego = () => {
  clearInterval(intervalo)
  COUNT = 0
  repintarTexto(COUNT)

  const allPaltas = document.querySelectorAll('.palta')
  allPaltas.forEach((palta) => palta.remove())

  pausado = true
  toggleButton(
    document.querySelector('.boton-aguacate.show'),
    document.querySelector('.boton-aguacate:not(.show)')
  )
}

// Modificar la función que aumenta el contador y actualiza la puntuación máxima
const recogerPalta = (e) => {
  const audio = document.querySelector('audio')
  audio.volume = 0.5
  audio.play()
  COUNT++
  repintarTexto(COUNT)

  // Si la puntuación actual supera la máxima, actualizarla y almacenarla
  if (COUNT > maxScore) {
    maxScore = COUNT
    localStorage.setItem('maxScore', maxScore)

    // Actualizar la puntuación máxima en tiempo real en la interfaz
    const textoMaxScore = document.querySelector('.max-score')
    textoMaxScore.textContent = `Máxima puntuación: ${maxScore}`
  }

  e.target.classList.remove('recoger')
  let randomTop = Math.random() * 20 + 80
  let randomLeft = Math.random() * 20 + 80
  e.target.style.top = `${window.innerHeight - randomTop}px`
  e.target.style.left = `${window.innerWidth - randomLeft}px`
}

const repintarTexto = (cont) => {
  const texto = document.querySelector('.contador')
  texto.textContent = cont
}

const toggleButton = (jugar, pausar) => {
  if (pausado) {
    jugar.classList.add('show')
    pausar.classList.remove('show')
  } else {
    pausar.classList.add('show')
    jugar.classList.remove('show')
  }
}

const iniciarJuego = () => {
  intervalo = setInterval(() => {
    createPalta()
  }, 1000)
}

const createPalta = () => {
  const divContent = document.querySelector('.content')

  let randomLeft = Math.random() * (window.innerWidth - 100)
  let randomTop = Math.random() * (window.innerHeight - 200)

  const imgPalta = document.createElement('img')
  imgPalta.className = 'palta'
  imgPalta.style.top = `${randomTop + 150}px`
  imgPalta.style.left = `${randomLeft}px`
  imgPalta.style.transform = `rotate(${Math.random() * 360}deg)`
  imgPalta.classList.add('recoger')

  imgPalta.addEventListener('click', (e) => recogerPalta(e))

  imgPalta.src = './assets/guac-a-mole/palta.png'

  divContent.append(imgPalta)
  comprobar()
}

const comprobar = () => {
  const allPaltas = document.querySelectorAll('.recoger')

  if (allPaltas.length > 100) {
    alert('Los aguacates te superan')
    clearInterval(intervalo)
  }
}
