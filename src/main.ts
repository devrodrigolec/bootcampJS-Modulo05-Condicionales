const puntuacionDiv = document.getElementById("puntuacion-jugador");
const pedirCartaBoton = document.getElementById("pedir-carta");
const cartasJugadorDiv = document.getElementById("cartas-jugador");
const gameOverDiv = document.getElementById("game-over");
const reiniciarBoton = document.getElementById("reiniciar");
const reiniciarBoton2= document.getElementById("reiniciar2");
const mePlantoBoton = document.getElementById("me-planto");
const mensajeJuevoDiv = document.getElementById("mensaje-juego");
let puntuacionJugador: number = 0;

const pedirCarta = (): number => {
  const numero = Math.ceil(Math.random() * 10);
  return numero > 7 ? numero + 2 : numero;
};

const mostrarPuntuacion = (): void => {
  if (puntuacionDiv) {
    puntuacionDiv.innerHTML = `Puntuación Jugador: ${puntuacionJugador} puntos`;
  }
};

const mostrarCarta = (carta: number): void => {
  let cartaHTML: string = "";
  switch (carta) {
    case 1:
      cartaHTML = "1_as";
      break;
    case 2:
      cartaHTML = "2_dos";
      break;
    case 3:
      cartaHTML = "3_tres";
      break;
    case 4:
      cartaHTML = "4_cuatro";
      break;
    case 5:
      cartaHTML = "5_cinco";
      break;
    case 6:
      cartaHTML = "6_seis";
      break;
    case 7:
      cartaHTML = "7_siete";
      break;
    case 10:
      cartaHTML = "10_sota";
      break;
    case 11:
      cartaHTML = "11_caballo";
      break;
    case 12:
      cartaHTML = "12_rey";
      break;
    default:
      cartaHTML = "Error xD";
  }

  if (cartasJugadorDiv) {
    const cartaImg = document.createElement("img");
    cartaImg.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${cartaHTML}-copas.jpg`;
    cartaImg.alt = "carta del juego";
    cartaImg.classList.add("carta-jugador");
    cartasJugadorDiv.append(cartaImg);
  }
};

const calcularPuntuacion = (carta: number): void => {
  if (carta > 7) {
    puntuacionJugador = puntuacionJugador + 0.5;
  } else {
    puntuacionJugador = puntuacionJugador + carta;
  }
  mostrarPuntuacion();
};

const gameOver = (puntuacionJugador: number): void => {
  if (puntuacionJugador > 7.5) {
    if (gameOverDiv) {
      gameOverDiv.classList.remove("hidden");
    }
  }
};

const reiniciarJuego = (): void => {
  if (gameOverDiv) {
    gameOverDiv.classList.add("hidden");
  }
  if (cartasJugadorDiv) {
    cartasJugadorDiv.innerHTML = "";
  }
  puntuacionJugador = 0;
  mostrarPuntuacion();
  if(pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
    pedirCartaBoton.disabled = false;
  }
  if(mensajeJuevoDiv) {
    mensajeJuevoDiv.innerHTML = ''
  }
};

const mePlanto = (puntuacionJugador : number): void => {
  let mensaje : string = '';
  if (puntuacionJugador <= 4) {
    mensaje = "Has sido muy conservador....";
  }
  if (puntuacionJugador >= 4.5) {
    mensaje = "Te ha entrado el canguelo eh?";
  }
  if (puntuacionJugador >= 6 || puntuacionJugador === 7) {
    mensaje = "Casi, casi ...";
  }
  if (puntuacionJugador === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  }

  if (mensajeJuevoDiv && mensaje.length > 0) {
    mensajeJuevoDiv.innerHTML = mensaje;
 
  }
};

if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
  pedirCartaBoton.addEventListener("click", () => {
    const carta: number = pedirCarta();
    calcularPuntuacion(carta);
    mostrarCarta(carta);
    gameOver(puntuacionJugador);
  });
}

if (reiniciarBoton && reiniciarBoton instanceof HTMLButtonElement) {
  reiniciarBoton.addEventListener("click", reiniciarJuego);
}
if (reiniciarBoton2 && reiniciarBoton2 instanceof HTMLButtonElement) {
  reiniciarBoton2.addEventListener("click", reiniciarJuego);
  
}
if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
  mePlantoBoton.addEventListener("click", () => {
    mePlanto(puntuacionJugador);
    if(pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
      pedirCartaBoton.disabled = true;
    }
  });
}
document.addEventListener("DOMContentLoaded", mostrarPuntuacion);
