import styles from "./edit-button.module.css";
const EditButton= ({id, name}) => {
    const handleEdit = () =>{
        //simplemente tiene que abrir el modal
        /*const db = apiReading();
            db.editName(id,name)*/
    }
    return(
       <>
       <button className={styles.penIcon} onClick= {handleEdit}></button>
       </>
        
    )
}
export default EditButton;