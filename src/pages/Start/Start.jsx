import { useState, useEffect } from 'react';
import { apiSakura } from '../../services/api';
import BoardCards from '../../components/organisms/BoardCards/BoardCards';
import styles from "./start.module.css";

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
        <>
            <h2 className={styles.title_start}>Elige 3 cartas para el orden de pasado, presente y futuro</h2>
            <BoardCards/>
            <p>Cartas listas en el mazo: {deck.length}</p>{/* solo para verificar que las cartas se cargaron */}
            {/* carrusel aquí */}
        </>
    );
}

export default Start;