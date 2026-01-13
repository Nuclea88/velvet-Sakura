import { useState, useEffect } from 'react';
import { apiSakura } from '../services/api';

const Start = () => {
    const [deck, setDeck] = useState([]);

    const [selectedCards, setSelectedCards] = useState({
        past: null,
        present: null,
        future: null
    });

    const handleCardClick = (card) => {
        let position = null;
        if (selectedCards.past === null) position = "past";
        else if (selectedCards.present === null) position = "present";
        else if (selectedCards.future === null) position = "future";

        if (position) {
            setSelectedCards({ ...selectedCards, [position]: card });
            const newDeck = deck.filter(c => c.id !== card.id);
            setDeck(newDeck);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await apiSakura().getDeck();
                const shuffledDeck = [...data].sort(() => Math.random() - 0.5);
                setDeck(shuffledDeck);
                console.log("¡Mazo mezclado y cargado con éxito!", shuffledDeck);
            } catch (error) {
                console.error("Error al cargar el mazo:", error);
            }
        };

        loadData(); deck
    }, []);

    return (
        <div>
            <h1>Elige 3 cartas para el orden de pasado, presente y futuro</h1>
            <p>Cartas listas en el mazo: {deck.length}</p>{/* solo para verificar que las cartas se cargaron y se van restando en cada click */}
            {/* CardCarousel aquí */}
        </div>
    );
}

export default Start;