import DeleteButton from "../../atoms/deleteButton.jsx/deleteButton.jsx";
import styles from "./reading-card.module.css";

const ReadingCard = ({date, name, id, onDelete}) =>{
    return( 
       <div className={styles.cardContainer}>
            <img src="src/assets/images/historial.png" alt="iconoHistorial"></img>
            <p>{date}</p>
            <div className={styles.nameRow}>
                <div className={styles.penIcon}></div> 
                <span>{name}</span>
            </div>
            <DeleteButton id={id} onDelete={onDelete} /> 
        </div>
    )
}
export default ReadingCard;

