import DeleteButton from "../deleteButton.jsx/deleteButton.jsx";
import EditButton from "../../atoms/editButton/EditButton.jsx";
import styles from "./reading-card.module.css";
import { useState } from "react";
import CheckButton from "../../atoms/checkButton/CheckButton.jsx";
import apiReading from "../../../services/apiReading.jsx";

const ReadingCard = ({date, name, id, onDelete}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(name);

    const db = apiReading();

    const handleSave = () => {
        db.editName(id, tempName).then(() => {
        setIsEditing(false)
        })
        .catch((err) => {
                console.error("Error al actualizar:", err);
                alert("No se pudo guardar el cambio.");
            });
    };

    return( 
       <div className={styles.cardContainer}>
            <img src="src/assets/images/historial.png" alt="iconoHistorial"></img>
            <p>{date}</p>
            <div className={styles.nameRow}>
                {isEditing ? (
                <>
                    <input 
                        className={styles.editInput}
                        value={tempName} 
                        onChange={(event) => setTempName(event.target.value)} 
                        autofocus
                    />
                    <CheckButton onSave={handleSave} />     
                </>
            ) : (
                <>
                <EditButton onOpenEdit={() => setIsEditing(true)}/> 
                <span>{tempName}</span>
                </>)}
            </div>
            <DeleteButton id={id} onDelete={onDelete} /> 
        </div>
    )
}
export default ReadingCard;

