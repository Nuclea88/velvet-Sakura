import apiReading from "../../../services/apiReading"
import { useState, useEffect } from "react"
import ReadingCard from "../../molecules/ReadingCard/ReadingCard";
import styles from "./history-cards.module.css"

const HistoryCards = ({userId}) => {
    const [reading,setReading]= useState([]);
    
    const dbReading = apiReading();

 useEffect(() => {
    dbReading.getByUserId(userId).then(data =>{
        setReading(data)
    })
 }, [])

return(
    <>
    <div className= {styles.card}>
    {reading.map((item) => (
        <ReadingCard 
            key={item.id} 
            date={item.date} 
            name={item.name} 
        />
))}
    </div>
    </>
)
}

export default HistoryCards;