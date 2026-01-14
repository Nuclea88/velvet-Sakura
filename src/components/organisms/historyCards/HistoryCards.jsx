import apiReading from "../../../services/apiReading"
import { useState, useEffect } from "react"
import ReadingCard from "../../molecules/ReadingCard/ReadingCard";
import styles from "./history-cards.module.css"
import DropButton from "../../molecules/dropButton/DropButton";

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
    <div className= {styles.card}>
    {reading.map((item) => (
        <ReadingCard 
            key={item.id} 
            date={item.date} 
            name={item.name} 
            id={item.id}
            onDelete= {triggerRefresh}
        />
))}
    </div>
    <div className={styles.drop_btn}><DropButton userId= {userId} onDelete={triggerRefresh}/></div>
    
    </>
)
}

export default HistoryCards;