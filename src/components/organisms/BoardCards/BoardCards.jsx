import styles from "./board-card.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BoardCards = () => {

  const arrayCards = [
    { 
        id: "1", 
        sakuraReverse: "https://i.ibb.co/XxrvMJ2/Reverso-Sakura.jpg", 
        spanishName: "Viento", 
        sakuraCard: "https://i.ibb.co/k5HVTP7/Viento-Sakura.jpg", 
        meaning: "Simboliza el intelecto, la sabiduría, la meteorología muestra información valiosa." 
    },
    { 
        id: "2", 
        sakuraReverse: "https://i.ibb.co/XxrvMJ2/Reverso-Sakura.jpg", 
        spanishName: "Vuelo", 
        sakuraCard: "https://i.ibb.co/ry15JSV/Vuelo-Sakura.jpg", 
        meaning: "Simboliza la libertad, la evasión." 
    },
    { 
        id: "3", 
        sakuraReverse: "https://i.ibb.co/XxrvMJ2/Reverso-Sakura.jpg", 
        spanishName: "Sombra", 
        sakuraCard: "https://i.ibb.co/q7dgnKZ/Sombra-Sakura.jpg", 
        meaning: "Indica el sigilo." 
    },
    { 
        id: "4", 
        sakuraReverse: "https://i.ibb.co/XxrvMJ2/Reverso-Sakura.jpg", 
        spanishName: "Agua", 
        sakuraCard: "https://i.ibb.co/HxLpWy5/Agua-Sakura.jpg", 
        meaning: "Simboliza los sentimientos, la expansión, la habilidad de la adivinación." 
    },
    {
        id: "5", 
        sakuraReverse: "https://i.ibb.co/XxrvMJ2/Reverso-Sakura.jpg", 
        spanishName: "Lluvia", 
        sakuraCard: "https://i.ibb.co/YBxFKBt/Lluvia-Sakura.jpg", 
        meaning: "Simboliza la cancelación de planes o procesos debido a agentes externos." 
    }
  ];

  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [slots, setSlots] = useState({ pasado: null, presente: null, futuro: null });
  const [deck, setDeck] = useState(arrayCards);
  const canReveal = slots.pasado && slots.presente && slots.futuro;

  const navigate = useNavigate();

  const placeCard = (card) => { 
    if (slots.pasado && slots.presente && slots.futuro) return;
    setSlots(prev => { 
        if (!prev.pasado) return { ...prev, pasado: card }; 
        if (!prev.presente) return { ...prev, presente: card }; 
        if (!prev.futuro) return { ...prev, futuro: card }; 
        return prev; });  
        setDeck(prev => prev.filter(c => c.id !== card.id)); };

const isDeckDisabled = slots.pasado && slots.presente && slots.futuro;
  const shuffleCards = () => {
    const shuffled = [...arrayCards].sort(() => Math.random() - 0.5);
    setCards(shuffled.slice(0, 3));
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleButtonClick = () => {
  if (!revealed) {
    setRevealed(true);
  } else {
    navigate("/prueba",{
        state:{
            pasado:slots.pasado,
            presente:slots.presente,
            futuro:slots.futuro
        }
    });
  }
};

const resetGame = () => {
  setSlots({
    pasado: null,
    presente: null,
    futuro: null
  });
  setDeck(arrayCards);
  setRevealed(false);
  shuffleCards();
};

return ( 
<> 
<div className={styles.board}>
  <div className={styles.slot}>
    <span className={styles.reading}>Pasado</span> 
    {slots.pasado && (<div className={`${styles.card} ${revealed ? styles.flipped : ""}`}> 
        <div className={styles.card_inner}> 
            <div className={`${styles.card_face} ${styles.card_back}`}> 
                <img src={slots.pasado.sakuraReverse} alt="Reverso" /> </div> 
                <div className={`${styles.card_face} ${styles.card_front}`}> 
                    <img src={slots.pasado.sakuraCard} alt="Pasado" /> </div> </div> </div>)} </div>

  <div className={styles.slot}> 
    <span className={styles.reading}>Presente</span>
    {slots.presente && ( <div className={`${styles.card} ${revealed ? styles.flipped : ""}`}> 
        <div className={styles.card_inner}> 
            <div className={`${styles.card_face} ${styles.card_back}`}> 
                <img src={slots.presente.sakuraReverse} alt="Reverso" /> </div> 
                <div className={`${styles.card_face} ${styles.card_front}`}> 
                    <img src={slots.presente.sakuraCard} alt="Presente" /> </div> </div> </div> )} </div>

  <div className={styles.slot}> 
    <span className={styles.reading}>Futuro</span>
    {slots.futuro && ( <div className={`${styles.card} ${revealed ? styles.flipped : ""}`}> 
        <div className={styles.card_inner}> 
            <div className={`${styles.card_face} ${styles.card_back}`}> 
            <img src={slots.futuro.sakuraReverse} alt="Reverso" /> </div> 
            <div className={`${styles.card_face} ${styles.card_front}`}> 
                <img src={slots.futuro.sakuraCard} alt="Futuro" /> </div> </div> </div> )} </div>
  </div>


    <div className={styles.mazo}> 
        {deck.map(card => ( 
            <div key={card.id} 
            className={styles.deck_card} 
            onClick={() => {
                    if (!isDeckDisabled) placeCard(card);
                }}> 
            <img src={card.sakuraReverse} alt="Reverso" /> 
            </div> ))} 
            </div>

  <div className={styles.field_btn}>         
    <input
  type="button"
  className={styles.subm_btn}
  value={revealed ? "Continuar" : "Revelar"}
  onClick={handleButtonClick}
  disabled={!canReveal && !revealed}
/>
 
    <input type="button" 
    className={styles.reset_btn} 
    value="Reiniciar" 
    onClick={ resetGame } /> 
    </div> 
    </> 
    );
}

export default BoardCards;
