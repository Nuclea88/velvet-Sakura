import Button from ".../atoms/Button/Button";

const ReadingCard = (date,name) =>{
    return(
        <>
            <img src="historial.png" alt="iconoHistorial"></img>
            <p>${date}</p>
            <p><img src="lapiz.png" alt="editar"></img>${name}</p>
            <Button BtnClass="SubmBtn" text="Eliminar" path="" /> 
        </>
    )
}
export default ReadingCard;