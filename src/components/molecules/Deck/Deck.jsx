import { useState, useRef } from "react";
import styles from "./deck.module.css";

const Deck = ({ deck, onCardClick, onShuffle }) => {
    const [isShuffling, setIsShuffling] = useState(false);
    const [lastSelectedId, setLastSelectedId] = useState(null);
    const carouselRef = useRef(null);

    const shuffleDeck = () => {
        setIsShuffling(true);
        onShuffle();
        if (carouselRef.current) {
            const randomPosition = Math.random() * 1000;
            carouselRef.current.scrollTo({ left: randomPosition, behavior: "smooth" });
        }
        setTimeout(() => setIsShuffling(false), 500);
    };

    const selectCard = (card) => {
        setLastSelectedId(card.id);
        setTimeout(() => {
            onCardClick(card);
            setLastSelectedId(null);
        }, 300);
    };

    const moveScroll = (direction) => {
        if (carouselRef.current) {
            const amount = direction === "left" ? -300 : 300;
            carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <section className={styles.deck_section}>
            <button className={styles.shuffle_btn} onClick={shuffleDeck} type="button">
                Barajar
            </button>

            <div className={styles.main_wrapper}>
                <button className={styles.arrow} onClick={() => moveScroll("left")} type="button">❮</button>

                <div
                    className={`${styles.deck_track} ${isShuffling ? styles.shuffling_flash : ""}`}
                    ref={carouselRef}
                >
                    {deck.map((card) => (
                        <div
                            key={card.id}
                            className={`${styles.card_item} ${lastSelectedId === card.id ? styles.card_ghost : ""}`}
                            onClick={() => selectCard(card)}
                        >
                            <img src={card.sakuraReverse} alt="Reverso Carta Sakura" />
                        </div>
                    ))}
                </div>

                <button className={styles.arrow} onClick={() => moveScroll("right")} type="button">❯</button>
            </div>
        </section>
    );
};

export default Deck;