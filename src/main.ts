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

const obtenerNumeroRandom = (): number => {
  return Math.ceil(Math.random() * 10);
};

const obtenerNumerodeCarta = (numeroRandom: number): number => {
  return numeroRandom > 7 ? numeroRandom + 2 : numeroRandom;
};

const mostrarPuntuacion = (puntuacionJugador : number): void => {
  if (puntuacionDiv && puntuacionDiv instanceof HTMLDivElement) {
    puntuacionDiv.innerHTML = `Puntuación Jugador: ${puntuacionJugador} puntos`;
  }
};

const formatearURLDeCarta = (carta: number): string => {
  let cartaString: string = "";
  switch (carta) {
    case 1:
      cartaString = "1_as";
      break;
    case 2:
      cartaString = "2_dos";
      break;
    case 3:
      cartaString = "3_tres";
      break;
    case 4:
      cartaString = "4_cuatro";
      break;
    case 5:
      cartaString = "5_cinco";
      break;
    case 6:
      cartaString = "6_seis";
      break;
    case 7:
      cartaString = "7_siete";
      break;
    case 10:
      cartaString = "10_sota";
      break;
    case 11:
      cartaString = "11_caballo";
      break;
    case 12:
      cartaString = "12_rey";
      break;
    default:
      cartaString = "Error xD";
  }

  const URLdeCarta = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${cartaString}-copas.jpg`;

  return URLdeCarta;
};

const crearCartaEnHTML = (URLDeCarta: string, htmlDiv: HTMLElement) => {
  if (cartasJugadorDiv && cartasJugadorDiv instanceof HTMLDivElement) {
    const cartaImg = document.createElement("img");
    cartaImg.src = URLDeCarta;
    cartaImg.alt = "carta del juego";
    cartaImg.classList.add("carta-jugador");
    cartaImg.classList.add("carta");
    if (htmlDiv && htmlDiv instanceof HTMLDivElement) {
      htmlDiv.append(cartaImg);
    }
  }
};

const mostrarCarta = (carta: number, htmlDiv: HTMLElement): void => {
  const cartaURL = formatearURLDeCarta(carta);
  if (htmlDiv && htmlDiv instanceof HTMLElement) {
    crearCartaEnHTML(cartaURL, htmlDiv);
  }
};

const calcularPuntuacion = (carta: number): number => {
  const puntuacion = carta > 7 ? 0.5 : carta;
  return puntuacion;
};

const sumarPuntuaciónJugador = (puntuacion: number): void => {
  puntuacionJugador = puntuacionJugador + puntuacion;
};

const gameOver = (): void => {
  if (gameOverDiv && gameOverDiv instanceof HTMLDivElement) {
    gameOverDiv.classList.remove("hidden");
  }
};

const desactivarBoton = (boton: HTMLElement): void => {
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = true;
  }
};

const activarBoton = (boton: HTMLElement): void => {
  if (boton && boton instanceof HTMLButtonElement) {
    boton.disabled = false;
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
  mostrarPuntuacion(puntuacionJugador);

  if (pedirCartaBoton && pedirCartaBoton instanceof HTMLElement) {
    activarBoton(pedirCartaBoton);
  }
  if (mePlantoBoton && mePlantoBoton instanceof HTMLElement) {
    activarBoton(mePlantoBoton);
  }
  if (siHubierasSeguidoBoton && siHubierasSeguidoBoton instanceof HTMLElement) {
    desactivarBoton(siHubierasSeguidoBoton);
  }
  if (mensajeJuevoDiv && mensajeJuevoDiv instanceof HTMLDivElement) {
    mostrarMensajeAJugador("");
  }
};

const obtenerMensajeDeMePlanto = (puntuacionJugador: number): string => {
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

  return mensaje;
};

const mostrarMensajeAJugador = (mensaje: string): void => {
  if (mensajeJuevoDiv && mensajeJuevoDiv instanceof HTMLDivElement) {
    mensajeJuevoDiv.innerHTML = mensaje;
  }
};

const siHubierasSeguido = (): void => {
  const numeroRandom = obtenerNumeroRandom();
  const carta: number = obtenerNumerodeCarta(numeroRandom);
  if (siHubieraSeguidoDiv) {
    mostrarCarta(carta, siHubieraSeguidoDiv);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarPuntuacion(puntuacionJugador)
});

const gestionarJuego = (): void => {

};
