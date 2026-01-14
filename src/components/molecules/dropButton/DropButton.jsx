import styles from "./drop-button.module.css";
import apiReading from "../../../services/apiReading";

const DropButton = ({userId, onDelete}) => {
    const db = apiReading();

    const handleDrop = () => {
        db.getByUserId(userId).then((readings) => {
        const DroppedPromisses = readings.map(element => {
            console.log(`borrando ${element.name}`);
           return db.deleteReading(element.id);
        });
        Promise.allSettled(DroppedPromisses).then((results) => {
                console.log("Historial borrado");
                const fallos = results.filter(r => r.status === 'rejected');
                    if (fallos.length > 0) {
                    console.warn(`Se borraron la mayoría, pero fallaron ${fallos.length}`);
                }
                if (onDelete) {
                onDelete();
                }
           });
        });
    };

    return(
        <>
        <button className={styles.subm_btn} onClick={(handleDrop)}>Borrar historial</button>
        </>
    )
}
export default DropButton;