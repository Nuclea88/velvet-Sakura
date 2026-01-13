import Button from "../../atoms/Button/Button.jsx";
import styles from "./reading-card.module.css";

const ReadingCard = ({date, name}) =>{
    return( 
       <div className={styles.cardContainer}>
            <img src="src/assets/images/historial.png" alt="iconoHistorial"></img>
            <p>{date}</p>
            <div className={styles.nameRow}>
                <div className={styles.penIcon}></div> 
                <span>{name}</span>
            </div>
            <Button BtnClass="SubmBtn" text="Eliminar" path="" /> 
        </div>
    )
}
export default ReadingCard;

