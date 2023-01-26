// import { createDeck } from './usecases/createdeck'; // se hace un import independiente
// para importar una exportacion independiente la puedo llamar con import, y la puedo renombrar
// import { a as nuevaConstante } from './usecases/createdeck.js';
// con la importacion por defecto de createDeck lo podria hacer de esta forma
// import { newDec } from './usecases/createdeck'; se llama la funcion como newDeck
// el editor ya sabe que la funcion que se exporta por defecto es createDeck

//import { createDeck } from "./usecases/createdeck"; //para llamarla se usa la funcion y al final se presiona 'Tab'

import { createDeck, askCard, cardValue } from "./usecases";


/*
2C - two of clubs,
2D - two of diamonds,
2D - two of hearts,
2S - two of spades
*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playersPoints = [];


// referencias del html
const btnAsk = document.querySelector('#btnAsk');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');

const pointsAll = document.querySelectorAll('small');

const divPlayersCards = document.querySelectorAll('.divCards')



const gameInit = (playerCount = 2) => {
    deck = createDeck(types, specials);
    playersPoints = [];
    for (let i = 0; i < playerCount; i++) {
        playersPoints.push(0);
    }
    pointsAll.forEach(elem => elem.innerText = 0);
    divPlayersCards.forEach(elem => elem.innerHTML = '');

    btnAsk.disabled = false;
    btnStop.disabled = false;

};


const drawCardOnBoard = (card, turn) => {

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    // defino la clase para que la carta no llegue grande
    imgCard.classList.add('carta');
    // creo la carta en el archivo HTML
    divPlayersCards[turn].append(imgCard);
};

const determineWinner = () => {

    const [playerPoints, computerPoints] = playersPoints
    setTimeout(() => {
        if (playerPoints === computerPoints) {
            alert('puntos iguales');
        } else if (playerPoints > 21) {
            console.log(playerPoints)
            alert('Te pasaste');
        } else if (computerPoints <= 21) {
            alert('La computadora ha ganado');
        } else {
            alert('has ganado');
        }
    }, 100);
}


// creo una funcion para acumular los puntos del jugador y la computadora
// turno: 0 = jugador 1, 1 =  jugador 2, ..., ultimo = computadora
const ppCumulative = (card, turn) => {
    // los puntos se van guardando para cada jugador
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    // se cambia el valor en la pagina y se muestra
    pointsAll[turn].innerText = playersPoints[turn];
    // retorno los grupos del jugador
    return playersPoints[turn];
};


//turno de la computadora

const compTurn = (playerPoints) => {
    let computerPoints = 0;
    do {
        // pido la carta y la guardo
        const card = askCard(deck);

        // llamo la funcion para ir guardando y mostrando los puntos
        computerPoints = ppCumulative(card, playersPoints.length - 1)

        drawCardOnBoard(card, playersPoints.length - 1);

        if (playerPoints > 21) {
            break;
        }

    } while ((computerPoints < playerPoints) && (playerPoints <= 21));

    determineWinner();

};


// eventos, debo escuchar cuando se haga click en el boton

/* para escuchar el evento se llama el addEventListener y se le pasan dos argumentos
lo que se va a escuchar del boton, en esta caso un 'Click' y,
ademas, una funcion como argumento,
esta funcion tiene el nombre de 'CALLBACK'.
lo que quiere decir es que cuando se haga click en el boton,
se va a disparar la accion (ejecutar la funcion)*/

// turno del jugador
btnAsk.addEventListener('click', () => {

    // pido la carta y la guardo
    const card = askCard(deck);

    let playerPoints = ppCumulative(card, 0)
    drawCardOnBoard(card, 0);


    // cuando el jugador se pasa de los 21 puntos
    if (playerPoints > 21) {
        btnAsk.disabled = true;
        compTurn(playerPoints);
        btnStop.disabled = true;

    } else if (playerPoints === 21) {
        compTurn(playerPoints);
        btnStop.disabled = true;

    }

});

// el jugador se planta y no pide mas cartas
btnStop.addEventListener('click', () => {
    btnAsk.disabled = true;
    btnStop.disabled = true;
    compTurn(playersPoints[0]);
});

// para comenzar un nuevo juego
btnNew.addEventListener('click', () => {
    // limpio todo
    gameInit();
    console.log('this beggins')
});

// retorno la funcion gameInit como variable newGame,
// para que sea usada en de forma externa
// return {
//   newGame: gameInit
// };





