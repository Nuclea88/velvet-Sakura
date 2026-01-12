import axios from "axios";

export const apiSakura = () => {
    const url = "https://6388b6e5a4bb27a7f78f96a5.mockapi.io/sakura-cards/";

    const getDeck = async () => {
        try {
            const response = await axios.get(url);
            return response.data.map(card => ({
                id: card.id,
                spanishName: card.spanishName,
                sakuraCard: card.sakuraCard,
                sakuraReverse: card.cardsReverse.sakuraReverse,
                meaning: card.meaning
            }));
        } catch (error) {
            console.error("Error al obtener las cartas:", error);
            throw error;
        }
    }

    const getCardById = async (id) => {
        try {
            const response = await axios.get(`${url}${id}`);
            const card = response.data;
            return {
                spanishName: card.spanishName,
                sakuraCard: card.sakuraCard,
                meaning: card.meaning
            };
        } catch (error) {
            console.error(`Error al obtener la carta con el id ${id}:`, error);
            throw error;
        }
    };

    return { getDeck, getCardById };
}