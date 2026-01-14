import { useRef, useState } from "react";
import styles from "./deck.module.css";

const Deck = ({ deck, onCardClick, onShuffle, slots = {}, placeCard }) => {
    const carouselRef = useRef(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const [lastSelectedId, setLastSelectedId] = useState(null);

    const moveScroll = (direction) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({
            left: direction === "left" ? -300 : 300,
            behavior: "smooth"
        });
    };

    const selectCard = (card) => {
        setLastSelectedId(card.id);
        setTimeout(() => {
            onCardClick(card);
            setLastSelectedId(null);
        }, 300);
    };
    const shuffleDeck = () => {
        setIsShuffling(true);
        onShuffle();
        if (carouselRef.current) {
            const randomPosition = Math.random() * 1000;
            carouselRef.current.scrollTo({ left: randomPosition, behavior: "smooth" });
        }
        setTimeout(() => setIsShuffling(false), 500);
    };

    const isDeckDisabled = slots.past && slots.present && slots.future;

    return (
        <>
            <div className={styles.mobile_section}>
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
            </div>

            <section className={styles.desktop_section}>
                <div className={styles.banner}>
                    <div className={styles.deck_desktop}>
                        {deck.map((card, index) => (
                            <div key={card.id}
                                className={styles.deck_card}
                                style={{
                                    "--position": index + 1,
                                    "--quantity": deck.length
                                }}
                                onClick={() => {
                                    if (!isDeckDisabled) placeCard(card);
                                }}>
                                <img src={card.sakuraReverse} alt="Reverso" />
                            </div>))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Deck;
