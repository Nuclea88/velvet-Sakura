import { useState, useEffect } from "react";
import Logo from "../../../assets/images/Logo.png";
import ProfileImg from "../../../assets/images/profile_image.png";
import styles from "./header.module.css";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
    const { user, logout } = useAuth();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
    
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1199);
         };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
     }, []);

    const navigate = useNavigate();

const handleTitleClick = () => {
  if (user) {
    navigate("/readings");
  } else {
    navigate("/");
  }
}


  const handleLogout = () => { 
    logout(); navigate("/"); 
  }

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Velvet Sakura" className={styles.logo_header} onClick={handleTitleClick} title="Inicio"/>
      <div className={styles.titles}>
          <h1 className={styles.main_title} >Velvet Sakura</h1>

        <h2 className={styles.subtitle_header}>
        {isMobile && user ? (
            <span className={styles.welcome_container}>Bienvenida  
              <button 
                className={styles.invisible_button}
                onClick={() =>navigate("/history")}>
                 {user.name}
              </button>
              <button
                onClick={handleLogout}
                className={styles.logout_icon}
                title="Cerrar sesión">⏻
              </button>
            </span>
        ) : ("Cartas del destino")}
        </h2>
      </div>

      {user && (
        <div className={styles.field_profile}>
          <button
            onClick={() =>navigate("/history")}
            className={styles.avatar_btn}
            title="Ir al historial">
            <img src={user.avatar || ProfileImg} alt="" className={styles.profile_img}/>
          </button>
          <p className={styles.profile_name}>{user.name} <button
                onClick={handleLogout}
                className={styles.logout_icon}
                title="Cerrar sesión">⏻</button></p>
        </div>
      )}
    </header>
  );
};


export default Header;