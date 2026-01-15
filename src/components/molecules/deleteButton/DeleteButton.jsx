import styles from "./delete-button.module.css";
import apiReading from "../../../services/apiReading";

const DeleteButton =({id, onDelete}) =>{
    const db = apiReading();
    const handleDelete = () => {
        console.log("Intentando borrar el ID:", id);
        db.deleteReading(id)
            .then(() => {
                if (onDelete) {
                    onDelete(); 
                }
            })
            .catch(err => console.error("Error al borrar:", err));
            };
    return(
        <>
            <button className={styles.subm_btn} onClick={(handleDelete)}>Eliminar</button>
        </>
)
}
export default DeleteButton;