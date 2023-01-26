
/**
 * devuelve la carta que se extrae del deck
 * @param {Array<String>} deckOfCards 
 * @returns {String} 
 */


export const askCard = (deckOfCards) => {
    if (!deckOfCards || deckOfCards.length === 0) {
        throw 'No hay cartas en el deck';
    }
    return deckOfCards.pop();
};