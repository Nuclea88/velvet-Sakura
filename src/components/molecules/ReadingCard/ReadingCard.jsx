import DeleteButton from "../deleteButton.jsx/deleteButton.jsx";
import EditButton from "../../atoms/editButton/EditButton.jsx";
import styles from "./reading-card.module.css";
import { useState } from "react";
import CheckButton from "../../atoms/checkButton/CheckButton.jsx";
import apiReading from "../../../services/apiReading.jsx";
import { useNavigate } from "react-router";

const ReadingCard = ({data, onDelete}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(data.name);
    
const navigate = useNavigate();
    const cards= {
            "past":data.pastCardId,
            "present":data.presentCardId,
            "future":data.futureCardId
    };

    const handleButtonClick = () => {
        navigate("/prueba",{
            state: {
            past: data.pastCardId,
            present: data.presentCardId,
            future: data.futureCardId
            }
        });
    }




    const db = apiReading();

    const handleSave = () => {
        db.editName(data.Id, tempName).then(() => {
        setIsEditing(false)
        })
        .catch((err) => {
                console.error("Error al actualizar:", err);
                alert("No se pudo guardar el cambio.");
            });
    };

    return( 
       <div className={styles.cardContainer}>
            <img src="src/assets/images/historial.png" alt="iconoHistorial" onClick={handleButtonClick}></img>
            <p>{data.date}</p>
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
            <DeleteButton id={data.Id} onDelete={onDelete} /> 
        </div>
    )
}
export default ReadingCard;

