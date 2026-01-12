import { useEffect, useState } from "react";
import styles from "./tarot-results.module.css";
import { apiSakura } from "../../services/api";
import Button from "../../components/atoms/Button/Button";

export default function TarotResult() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { getDeck } = apiSakura();
        const deck = await getDeck();
        setCards(deck.slice(0, 3));
      } catch (error) {
        console.error("Error cargando las cartas", error);
      }
    };

    fetchCards();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const getStageLabel = (index) => {
    if (index === 0) return "Pasado";
    if (index === 1) return "Presente";
    return "Futuro";
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>El sino es revelado</h2>
      </div>

      <div className={styles.desktop}>
        {cards.map((card, index) => (
          <div key={card.id} className={styles.card_block}>
            <h3 className={styles.card_title}>{getStageLabel(index)}</h3>

            <img
              src={card.sakuraCard}
              alt={card.spanishName}
              className={styles.card_image}
            />

            <p className={styles.description}>{card.meaning}</p>
          </div>
        ))}
      </div>

      <div className={styles.mobile}>
        {cards.length > 0 && (
          <>
            <h3 className={styles.card_title}>{getStageLabel(currentIndex)}</h3>

            <div className={styles.mobile_card}>
              <button
                className={styles.arrow_left}
                onClick={handlePrev}
                aria-label="Carta anterior"
              >
                ◀
              </button>

              <img
                src={cards[currentIndex].sakuraCard}
                alt={cards[currentIndex].spanishName}
                className={styles.card_image}
              />

              <button
                className={styles.arrow_right}
                onClick={handleNext}
                aria-label="Siguiente carta"
              >
                ▶
              </button>
            </div>

            <p className={styles.description}>{cards[currentIndex].meaning}</p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <Button text="Guardar" BtnClass="subm_btn" path="/register" />

        <Button text="Reiniciar" BtnClass="subm_btn" path="/" />
      </div>
    </section>
  );
}
