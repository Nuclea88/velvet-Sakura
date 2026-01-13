import { useState, useEffect } from 'react';
import { apiSakura } from '../services/api';
import Deck from '../components/molecules/Deck/Deck';

const Start = () => {
    const [deck, setDeck] = useState([]);

    const [selectedCards, setSelectedCards] = useState({
        past: null,
        present: null,
        future: null
    });

    const shuffleCards = () => {
        const shuffled = [...deck].sort(() => Math.random() - 0.5);
        setDeck(shuffled);
    };

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
                const initialData = [...data].sort(() => Math.random() - 0.5);
                setDeck(initialData);
                console.log("¡Mazo mezclado y cargado con éxito!", initialData);
            } catch (error) {
                console.error("Error al cargar el mazo:", error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h1>Elige 3 cartas para el orden de pasado, presente y futuro</h1>
        <Deck
            deck={deck}
            onCardClick={handleCardClick}
            onShuffle={shuffleCards}
        />
        </div>
    );
}

export default Start;