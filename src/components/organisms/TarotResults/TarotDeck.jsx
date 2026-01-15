import { useLocation } from "react-router";
import { useState } from "react";
import styles from "./tarot-deck.module.css";
import Button from "../../atoms/Button/Button";
import ArrowLeft from "../../../assets/images/flecha_izquierda.png";
import ArrowRight from "../../../assets/images/flecha_derecha.png";
import apiSave from "../../../services/apiSave";
import { useEffect } from "react";



const TarotDeck = ({user}) => {
  const { state } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingName, setReadingName] = useState("");
  const dbReadings=apiSave();
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);



  const { past, present, future } = state || {};

  const cards = [
  { ...past, stage: "Pasado" },
  { ...present, stage: "Presente" },
  { ...future, stage: "Futuro" },
];

const showActions =
  !isMobile || (isMobile && cards[currentIndex]?.stage === "Futuro");



  if (!state) {
    return <p>No hay cartas seleccionadas</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  

const handleSave = async () => {
  if (!readingName.trim()) {
    alert("Debes introducir un nombre para la partida");
    return;
  }

  const dataReading = {
    userId: user?.id,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    name: readingName,
    pastCardId: past.id,
    presentCardId: present.id,
    futureCardId: future.id,
  };

  try {
    await dbReadings.saveReading(dataReading);

    setIsModalOpen(false);
    setReadingName("");

    alert("Lectura guardada correctamente");

  } catch (error) {
    console.error(error);
    alert("Error al guardar la lectura");
  }
};




  return (
  <>

  <div className={styles.desktop}>
        <div key={cards.stage} className={styles.card_block}>
          <h3 className={styles.card_title}>Pasado</h3>
          <h4 className={styles.card_name}>{past.spanishName.toUpperCase()}</h4>  
          <img
            src={past.sakuraCard}
            alt={past.spanishName}
            className={styles.card_image}
          />
          <div className={styles.box_meaning}>  
          <p className={styles.description}>{past.meaning}</p>
          </div>
        </div>

        <div key={cards.stage} className={styles.card_block}>
          <h3 className={styles.card_title}>Presente</h3>
          <h4 className={styles.card_name}>{present.spanishName.toUpperCase()}</h4>

          <img
            src={present.sakuraCard}
            alt={present.spanishName}
            className={styles.card_image}
          />
        <div className={styles.box_meaning}>
          <p className={styles.description}>{present.meaning}</p>
          </div>
        </div>


        <div key={cards.stage} className={styles.card_block}>
          <h3 className={styles.card_title}>Futuro</h3>
          <h4 className={styles.card_name}>{future.spanishName.toUpperCase()}</h4>

          <img
            src={future.sakuraCard}
            alt={future.spanishName}
            className={styles.card_image}
          />
        <div className={styles.box_meaning}>
          <p className={styles.description}>{future.meaning}</p>
          </div>
        </div>
    </div>



    <div className={styles.mobile}>
      {cards.length > 0 && (
        <>
          <h3 className={styles.card_title}>
            {cards[currentIndex].stage}
          </h3>

          <div className={styles.mobile_card}>
            {currentIndex !== 0 && (
            <button
            className={styles.arrow_left}
            onClick={handlePrev}
            >
            <img src={ArrowLeft} alt="Izquierda" />
            </button>
              )}
            <h4 className={styles.card_name}>
            {cards[currentIndex].spanishName?.toUpperCase()}
            </h4>
            <img
              src={cards[currentIndex].sakuraCard}
              alt={cards[currentIndex].spanishName}
              className={styles.card_image}
            />

           {currentIndex !== cards.length - 1 && (
  <button
    className={styles.arrow_right}
    onClick={handleNext}
  >
    <img src={ArrowRight} alt="Derecha" />
  </button>
)}
          </div>

        <div className={styles.box_meaning}>
          <p className={styles.description}>
            {cards[currentIndex].meaning}
          </p>
          </div>
        </>
      )}
    </div>


      {showActions && (
     <div className={styles.actions}>
        <input className={styles.subm_btn}  type="button" value="Guardar" onClick={() => setIsModalOpen(true)} />

        <Button text="Reiniciar" BtnClass="reset_btn" path="/readings" />
      </div>
)}

      {isModalOpen && (
  <div className={styles.modal_overlay}>
    <div className={styles.modal}>
      <h3>Guardar lectura</h3>

      <input
        type="text"
        placeholder="Nombre de la partida"
        value={readingName}
        onChange={(e) => setReadingName(e.target.value)}
      />

      <div className={styles.modal_actions}>
        <button onClick={handleSave} className={styles.subm_btn}>
          Confirmar
        </button>
        <button onClick={() => setIsModalOpen(false)} className={styles.reset_btn}>
          Cancelar
        </button>

        
      </div>
    </div>
  </div>
)}

  </>
);
};

export default TarotDeck;























/*<section className={styles.container}>
      <div className={styles.header}>
        <h2>El sino es revelado</h2>
      </div>

      <div className={styles.desktop}>
        {cards.map((card, index) => (
          <div key={card.id} className={styles.card_block}>
            <h3 className={styles.card_title}>{getStageLabel(index)}</h3>

            <img
              src={past.sakuraCard}
              alt={past.spanishName}
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
















   /* <div style={{display:"flex"}}>
      <h2>Resultado de la tirada</h2>

      <div>
        <h3>Pasado</h3>
        <p>{past.spanishName}</p>
        <img src={past.sakuraCard} />
        <p>{past.meaning}</p>
        <p>{past.id}</p>
      </div>

      <div>
        <h3>Presente</h3>
        <p>{present.spanishName}</p>
        <img src={present.sakuraCard} />
        <p>{present.meaning}</p>
        <p>{present.id}</p>
      </div>

      <div>
        <h3>Futuro</h3>
        <p>{future.spanishName}</p>
        <img src={future.sakuraCard} />
        <p>{future.meaning}</p>
        <p>{future.id}</p>
      </div>
    </div>*/
 