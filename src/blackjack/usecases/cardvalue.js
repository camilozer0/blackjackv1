
/**
 * se extrae el valor numerico de la carta
 * @param {Sring} card recibe la carta
 * @returns {Number} valor numerico de la carta
 */

export const cardValue = (card) => {
    // extraigo el valor de la carta
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ?
        (value === 'A') ? 11 : 10
        : parseInt(value)
};