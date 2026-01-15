import apiReading from "../../../services/apiReading"
import { useState, useEffect } from "react"
import ReadingCard from "../../molecules/ReadingCard/ReadingCard";
import styles from "./history-cards.module.css"
import DropButton from "../../molecules/dropButton/DropButton";
import Button from "../../atoms/Button/Button";

const HistoryCards = ({userId}) => {
    const [reading,setReading]= useState([]);
    const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);
    
    const dbReading = apiReading();

 useEffect(() => {
    dbReading.getByUserId(userId).then(data =>{
        setReading(data)
    })
 }, [userId, refresh]);

return(
    <>
    {reading && reading.length > 0 ?(
        <section>
    <div className= {styles.card}>
    {reading.map((item) => (
        <ReadingCard 
            key={item.id} 
            data={item} 
            onDelete= {triggerRefresh}
            
        />
))}
    </div>
    <div className={styles.drop_btn}><DropButton userId= {userId} onDelete={triggerRefresh}/></div>
    </section>
    ):(
         <section className= {styles.no_cards}>
            <img src="/src/assets/images/Momo.jpg" alt="Relax"/>
            <p> No hay lecturas guardadas. Revela ahora tu destino.</p>
            <Button BtnClass="subm_btn" path={() => navigate("/")} text= "Inicio" />
         </section>
        
    )}
    </>
    
)
}

export default HistoryCards;