const puntuacionDiv = document.getElementById("puntuacion-jugador");
const pedirCartaBoton = document.getElementById("pedir-carta");
const cartasJugadorDiv = document.getElementById("cartas-jugador");
const gameOverDiv = document.getElementById("game-over");
const reiniciarBotonGameOver = document.getElementById("reiniciar-game-over");
const reiniciarBoton = document.getElementById("reiniciar");
const mePlantoBoton = document.getElementById("me-planto");
const mensajeJuevoDiv = document.getElementById("mensaje-juego");
const siHubieraSeguidoDiv = document.getElementById("si-hubieras-seguido");
const siHubierasSeguidoBoton = document.getElementById(
  "si-hubieras-seguido-boton"
);
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

const mostrarCarta = (carta: number, htmlDiv: HTMLElement): void => {
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
    cartaImg.classList.add("carta");
    htmlDiv.append(cartaImg);
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
  if (cartasJugadorDiv && siHubieraSeguidoDiv) {
    cartasJugadorDiv.innerHTML = "";
    siHubieraSeguidoDiv.innerHTML = "";
  }
  puntuacionJugador = 0;
  mostrarPuntuacion();
  if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
    pedirCartaBoton.disabled = false;
  }
  if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
    mePlantoBoton.disabled = false;
  }
  if (
    siHubierasSeguidoBoton &&
    siHubierasSeguidoBoton instanceof HTMLButtonElement
  ) {
    siHubierasSeguidoBoton.disabled = true;
  }
  if (mensajeJuevoDiv) {
    mensajeJuevoDiv.innerHTML = "";
  }
};

const mePlanto = (puntuacionJugador: number): void => {
  let mensaje: string = "";
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

const siHubierasSeguido = (): void => {
  const carta: number = pedirCarta();
  if (siHubieraSeguidoDiv) {
    mostrarCarta(carta, siHubieraSeguidoDiv);
  }
};

if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
  pedirCartaBoton.addEventListener("click", () => {
    const carta: number = pedirCarta();
    calcularPuntuacion(carta);
    if (cartasJugadorDiv) {
      mostrarCarta(carta, cartasJugadorDiv);
    }
    gameOver(puntuacionJugador);
  });
}

document.addEventListener("DOMContentLoaded", mostrarPuntuacion);

if (
  reiniciarBotonGameOver &&
  reiniciarBotonGameOver instanceof HTMLButtonElement
) {
  reiniciarBotonGameOver.addEventListener("click", reiniciarJuego);
}
if (reiniciarBoton && reiniciarBoton instanceof HTMLButtonElement) {
  reiniciarBoton.addEventListener("click", reiniciarJuego);
}
if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
  mePlantoBoton.addEventListener("click", () => {
    mePlanto(puntuacionJugador);
    if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
      pedirCartaBoton.disabled = true;
    }
    if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
      mePlantoBoton.disabled = true;
    }
    if (
      siHubierasSeguidoBoton &&
      siHubierasSeguidoBoton instanceof HTMLButtonElement
    ) {
      siHubierasSeguidoBoton.disabled = false;
    }
  });
}
if (
  siHubierasSeguidoBoton &&
  siHubierasSeguidoBoton instanceof HTMLButtonElement
) {
  siHubierasSeguidoBoton.addEventListener("click", siHubierasSeguido);
}
