import DeleteButton from "../../components/atoms/deleteButton.jsx/deleteButton";
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
            <p>Para eliminar un historial haz click en Eliminar</p>
            <p>Para borrar el  historial haz click en Borrar</p>
            </div>
            <div className={styles.edit_user}>
                <button>E</button>
                <span>Editar nombre usuario</span>
            </div>
          </header>
          <section>
              <HistoryCards userId="0"/>
          </section>
          <footer>
            <button>Borrar</button>
          </footer>
        </main>
        </>
) } 
 export default History; 