const ButtonReveal=({text, BtnClass,path})=>{
return(
<>
<button className={BtnClass} onClick={() => navigate(path)}>{text}</button>
</>

)
}

export default ButtonReveal;