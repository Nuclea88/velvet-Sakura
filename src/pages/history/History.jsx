import { useState } from "react";
import styles from "./history.module.css";
import apiAccount from "../../services/apiAccount";
import useAuth from "../../hooks/useAuth";
import { checkNameExists } from "../../services/checkName";
import EditButton from "../../components/atoms/EditButton/EditButton";
import CheckButton from "../../components/atoms/CheckButton/CheckButton";
import HistoryCards from "../../components/organisms/HistoryCards/HistoryCards";

 const History = () => {
    const {user, login} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(user?.name||"invitada");
    const [nameExists, setNameExists] = useState(false);
  
    const db = apiAccount();
    const handleSave = async() => {
      setNameExists(false);
      if (tempName === user.name) {
        setIsEditing(false);
        return;
    }
      const existsName = await checkNameExists (tempName);
      if (existsName){
        setNameExists(true);
      }else{
        db.editAccount(user.id, tempName).then(() => {
        setIsEditing(false),
        login({ ...user, name: tempName })
        })
        .catch((err) => {
                console.error("Error al actualizar:", err);
                alert("No se pudo guardar el cambio.");
            }); 
    }};

    if (!user) {
        return <div className={styles.loading}>Cargando datos de usuario...</div>;
    }
    return (
         <>
         <main>
          <header className={styles.header_section}>
            <div>
            <h3>Bienvenida, {tempName}, a tu historial de lecturas</h3>
            <p>Para eliminar una lectura haz click en Eliminar</p>
            <p>Para borrar el historial haz click en Borrar</p>
            </div>
            <div className={styles.edit_user}>
              {isEditing ? (
                <>
                    <input 
                        className={styles.editInput}
                        value={tempName} 
                        onChange={(event) => setTempName(event.target.value)} 
                        autoFocus
                    />
                    <CheckButton onSave={handleSave} />    
                    {nameExists &&(<span >El nombre ya existe. Elige otro</span> )}
                </>
            ) : (
                <>
                <EditButton onOpenEdit={() => setIsEditing(true)}/> 
                  <span>Editar nombre usuario</span>
                </>)}         
            </div>
          </header>
          <section>
              <HistoryCards userId={user.id}/>
          </section>
        </main>
        </>
) } 
 export default History; 