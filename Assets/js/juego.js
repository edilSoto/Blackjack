(() => {
    'use strict'

    //#region Variables
    const divCartas = document.querySelectorAll('.espacioCartas');
    const puntuaciones = document.querySelectorAll('small');
    const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    let puntosJugador = 0;
    let puntosCasa = 0;
    let mazoCartas = [];
    let tipoCartas = ['H', 'D', 'S', 'C'];
    let especiales = ['A', 'J', 'Q', 'K'];

    //#endregion

    //#region Funciones
    const cargaBaraja = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipoCartas) {
                mazoCartas.push(`${i}${tipo}`)
            }
        }

        for (let especial of especiales) {
            for (let tipo of tipoCartas) {
                mazoCartas.push(`${especial}${tipo}`)
            }
        }
    }

    const pedirCarta = () => {

        if (mazoCartas.length === 0) throw 'No quedan cartas en el mazo';

        const carta = mazoCartas.pop();

        return carta;
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    const turnoComputador = (puntuacionMinima) => {

        do {
            const carta = pedirCarta();
            puntosCasa += valorCarta(carta);
            const imagenCarta = document.createElement('img');
            imagenCarta.src = `Assets/cartas/${carta}.png`;
            imagenCarta.classList.add('carta');
            puntuaciones[1].innerText = puntosCasa;
            divCartas[1].append(imagenCarta);

        } while ((puntosCasa < puntuacionMinima) && (puntuacionMinima < 21))

        setTimeout(() => {
            if (puntosCasa > 21) {

                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Has ganado');

            } else if (puntosCasa === 21) {

                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Lo siento mucho, perdiste');

            } else if (puntosCasa > puntuacionMinima || puntosCasa === puntuacionMinima) {

                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Lo siento mucho, perdiste');

            }
        }, 100);

    }
    //#endregion

    //#region Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        const imagenCarta = document.createElement('img');
        imagenCarta.src = `Assets/cartas/${carta}.png`;
        imagenCarta.classList.add('carta');
        puntuaciones[0].innerText = puntosJugador;
        divCartas[0].append(imagenCarta);

        setTimeout(() => {
            if (puntosJugador > 21) {

                turnoComputador();
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Lo siento mucho, perdiste');

            } else if (puntosJugador === 21) {

                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert('Has ganado');
            }
        }, 100);
    })

    btnDetener.addEventListener('click', () => {

        turnoComputador(puntosJugador);
    })

    btnNuevoJuego.addEventListener('click', () => {

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        puntosJugador = 0;
        puntosCasa = 0;
        puntuaciones[0].innerText = 0;
        puntuaciones[1].innerText = 0;
        divCartas[0].innerHTML = '';
        divCartas[1].innerHTML = '';

    })

    //#endregion

    cargaBaraja();
    mazoCartas = _.shuffle(mazoCartas);

})();