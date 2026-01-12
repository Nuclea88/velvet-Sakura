import { useState, useEffect } from 'react';
import { apiSakura } from '../services/api';

const Start = () => {
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await apiSakura().getDeck();
                setDeck(data);
                console.log("¡Mazo cargado con éxito!", data);
            } catch (error) {
                console.error("Error al cargar el mazo:", error);
            }
        };

        loadData();
    }, []);
    
    return (
        <div>
            <h1>Elige 3 cartas para el orden de pasado, presente y futuro</h1>
            <p>Cartas listas en el mazo: {deck.length}</p>{/* solo para verificar que las cartas se cargaron */}
            {/* carrusel aquí */}
        </div>
    );
}

export default Start;