import _ from 'underscore';

// si pongo el export al principio, lo que hago es una exportacion independiente, hay otra forma de hacerlo.
// puedo exportar cualquier cosa que quiera poniendole el export al principio
// export const a = 'Hola mundo'; aca estoy exportando 'a'
/**
 * Esta funcion crea un deck de forma aleatoria
 * @param {Array<String>} typeOfCards 
 * @param {Array<String} letterCards 
 * @returns {Array<String} retorna un nuevo deck aleatorio
 */

export const createDeck = (typeOfCards, letterCards) => {

    if (!typeOfCards || typeOfCards.length < 1)
        throw new Error('typeOfCards debe ser un arreglo con valores');
    if (!letterCards || letterCards.length < 1)
        throw new Error('letterCards debe ser un arreglo con valores');

    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let type of typeOfCards) {
            deck.push(i + type);
        }
    };

    for (let type of typeOfCards) {
        for (let special of letterCards) {
            deck.push(special + type);
        }
    };

    return _.shuffle(deck);

};


// esta es una exportacion por defecto, lo que pasa es que al momento de importarla la puedo llamar como quiera
// export default createDeck;
// solo se puede tener una exportacion por defecto por archivo.