import { useLocation } from "react-router";
import { useState } from "react";
import styles from "./saved-reading.module.css";
import Button from "../../atoms/Button/Button";
import ArrowLeft from "../../../assets/images/flecha_izquierda.png";
import ArrowRight from "../../../assets/images/flecha_derecha.png";
import apiSave from "../../../services/apiSave";
import { useNavigate } from "react-router";


  const SavedReading = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dbReadings = apiSave();

  if (!state) {
    return <p>No hay lectura seleccionada</p>;
  }

  const { past, present, future, id } = state;

  const cards = [
    { ...past, stage: "Pasado" },
    { ...present, stage: "Presente" },
    { ...future, stage: "Futuro" },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta lectura?")) return;

    try {
      await dbReadings.deleteReading(id);
      alert("Lectura eliminada");
      navigate("/history");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la lectura");
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

     <div className={styles.actions}>
        <input className={styles.subm_btn}  type="button" value="Eliminar" onClick={handleDelete} />

        <Button text="Atrás" BtnClass="reset_btn" path="/history" />
      </div>
  </>
);
}

export default SavedReading;
