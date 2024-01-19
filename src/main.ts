const puntuacionDiv = document.getElementById("puntuacion-jugador");
const pedirCartaBoton = document.getElementById('pedir-carta');
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

const mostrarCarta = () => {
  
}


if(pedirCartaBoton && pedirCartaBoton instanceof HTMLButtonElement){
  pedirCartaBoton.addEventListener('click', () => {
    console.log(pedirCarta());
  });
  
}

document.addEventListener("DOMContentLoaded", mostrarPuntuacion);
