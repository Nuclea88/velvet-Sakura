import EditButton from "../../components/atoms/editButton/EditButton";
import HistoryCards from "../../components/organisms/historyCards/HistoryCards";
import styles from "./history.module.css";

 const History = () => {
    const storedUser = localStorage.getItem('user');
    const name = storedUser ? storedUser.name : "Invitada";
    return (
         <>
         <main>
          <header className={styles.header_section}>
            <div>
            <h3>Bienvenida {name} a tu historial de lecturas</h3>
            <p>Para eliminar una lectura haz click en Eliminar</p>
            <p>Para borrar el historial haz click en Borrar</p>
            </div>
            <div className={styles.edit_user}>
                <EditButton />
                <span>Editar nombre usuario</span>
            </div>
          </header>
          <section>
              <HistoryCards userId="0"/>
          </section>
        </main>
        </>
) } 
 export default History; 