import DeleteButton from "../deleteButton.jsx/deleteButton.jsx";
import EditButton from "../../atoms/editButton/EditButton.jsx";
import styles from "./reading-card.module.css";
import { useState } from "react";

const ReadingCard = ({date, name, id, onDelete}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);
    return( 
       <div className={styles.cardContainer}>
            <img src="src/assets/images/historial.png" alt="iconoHistorial"></img>
            <p>{date}</p>
            <div className={styles.nameRow}>
                {isEditing ? (
                <>
                    <input 
                        value={tempName} 
                        onChange={(event) => setTempName(event.target.value)} 
                    />
                    {/* El botón de confirmar (Check) va aquí fuera */}
                    <button onClick={() => {
                        console.log("Guardando...", tempName);
                        setIsEditing(false);
                    }}>✅</button>
                </>
            ) : (
                <>
                <EditButton onOpenEdit={() => setIsEditing(true)}/> 
                <span>{name}</span>
                </>)}
            </div>
            <DeleteButton id={id} onDelete={onDelete} /> 
        </div>
    )
}
export default ReadingCard;

