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

const mostrarPuntuacion = (puntuacionJugador: number): void => {
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
    cartaImg.classList.add("slide-in-blurred-left");
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

const sumarPuntuacionJugador = (puntuacion: number): number => {
  return puntuacionJugador + puntuacion;
};

const asignarPuntuacionJugador = (puntuacionSumada: number): void => {
  puntuacionJugador = puntuacionSumada;
};

const comprobarPartida = (): void => {
  if (puntuacionJugador === 7.5) {
    const mensajeAJugador: string = mensajeHasGanado();
    mostrarMensajeAJugador(mensajeAJugador);
    if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
      desactivarBoton(pedirCartaBoton);
    }
    if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
      desactivarBoton(mePlantoBoton);
    }
  }
  if (puntuacionJugador > 7.5) {
    MostrarGameOver();
  }
};

const MostrarGameOver = (): void => {
  if (gameOverDiv && gameOverDiv instanceof HTMLDivElement) {
    gameOverDiv.classList.remove("hidden");
  }
};

const ocultarGameOver = (): void => {
  if (gameOverDiv && gameOverDiv instanceof HTMLDivElement) {
    gameOverDiv.classList.add("hidden");
  }
};
const desactivarBoton = (boton: HTMLButtonElement): void => {
  boton.disabled = true;
};

const activarBoton = (boton: HTMLButtonElement): void => {
  boton.disabled = false;
};

const vaciarMesaDeCartas = (): void => {
  if (cartasJugadorDiv && siHubieraSeguidoDiv) {
    cartasJugadorDiv.innerHTML = "";
    siHubieraSeguidoDiv.innerHTML = "";
  }
};

const gestionarBotonesReiniciarJuego = (): void => {
  if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
    activarBoton(pedirCartaBoton);
  }
  if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
    activarBoton(mePlantoBoton);
  }
  if (
    siHubierasSeguidoBoton &&
    siHubierasSeguidoBoton instanceof HTMLButtonElement
  ) {
    desactivarBoton(siHubierasSeguidoBoton);
  }
};

const gestionarBotonesMePlanto = (): void => {
  if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
    desactivarBoton(pedirCartaBoton);
  }
  if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
    desactivarBoton(mePlantoBoton);
  }
  if (
    siHubierasSeguidoBoton &&
    siHubierasSeguidoBoton instanceof HTMLButtonElement
  ) {
    activarBoton(siHubierasSeguidoBoton);
  }
}

const reiniciarJuego = (): void => {
  puntuacionJugador = 0;
  mostrarPuntuacion(puntuacionJugador);
  vaciarMesaDeCartas();
  gestionarBotonesReiniciarJuego();
  if (mensajeJuevoDiv && mensajeJuevoDiv instanceof HTMLDivElement) {
    mostrarMensajeAJugador("");
  }
};

const mensajeHasGanado = (): string => {
  return "¡Lo has clavado! ¡Enhorabuena!";
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

  return mensaje;
};

const mostrarMensajeAJugador = (mensaje: string): void => {
  if (mensajeJuevoDiv && mensajeJuevoDiv instanceof HTMLDivElement) {
    mensajeJuevoDiv.innerHTML = mensaje;
  }
};

const pedirCarta = (): void => {
  const numeroRandom: number = obtenerNumeroRandom();
  const carta: number = obtenerNumerodeCarta(numeroRandom);
  const puntuacion = calcularPuntuacion(carta);
  const puntuacionSumada = sumarPuntuacionJugador(puntuacion);
  asignarPuntuacionJugador(puntuacionSumada);
  mostrarPuntuacion(puntuacionJugador);
  if (cartasJugadorDiv && cartasJugadorDiv instanceof HTMLDivElement) {
    mostrarCarta(carta, cartasJugadorDiv);
  }
  comprobarPartida();
};

const mePlanto = (): void => {
  gestionarBotonesMePlanto();
  const mensajeAJugador = obtenerMensajeDeMePlanto(puntuacionJugador);
  mostrarMensajeAJugador(mensajeAJugador);
};

const siHubierasSeguido = (): void => {
  const numeroRandom: number = obtenerNumeroRandom();
  const carta: number = obtenerNumerodeCarta(numeroRandom);
  if (siHubieraSeguidoDiv && siHubieraSeguidoDiv instanceof HTMLDivElement) {
    mostrarCarta(carta, siHubieraSeguidoDiv);
  }
  if(siHubierasSeguidoBoton && siHubierasSeguidoBoton instanceof HTMLButtonElement){
    desactivarBoton(siHubierasSeguidoBoton);
  }
};

const handlePedirCarta = (): void => {
  if (pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement) {
    pedirCartaBoton.addEventListener("click", pedirCarta);
  }
};

const handleMePlanto = (): void => {
  if (mePlantoBoton && mePlantoBoton instanceof HTMLButtonElement) {
    mePlantoBoton.addEventListener("click", mePlanto);
  }
};

const handleReiniciarJuego = (): void => {
  if (
    reiniciarBotonGameOver &&
    reiniciarBotonGameOver instanceof HTMLButtonElement
  ) {
    reiniciarBotonGameOver.addEventListener("click", () => {
      ocultarGameOver();
      reiniciarJuego();
    });
  }

  if (reiniciarBoton && reiniciarBoton instanceof HTMLButtonElement) {
    reiniciarBoton.addEventListener("click", reiniciarJuego);
  }
};

const handleSiHubierasSeguido = () => {
  if (
    siHubierasSeguidoBoton &&
    siHubierasSeguidoBoton instanceof HTMLButtonElement
  ) {
    siHubierasSeguidoBoton.addEventListener("click", siHubierasSeguido);
  }
};
const gestionarJuego = (): void => {
  handlePedirCarta();
  handleMePlanto();
  handleReiniciarJuego();
  handleSiHubierasSeguido();
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarPuntuacion(puntuacionJugador);
  gestionarJuego(); 
});
