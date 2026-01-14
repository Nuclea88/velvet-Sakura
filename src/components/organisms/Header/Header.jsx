import { useState, useEffect } from "react";
import { Link } from "react-router";
import Logo from "../../../assets/images/Logo.png";
import ProfileImg from "../../../assets/images/profile_image.png";
import styles from "./header.module.css";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
    const { user, logout } = useAuth();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 932);
    
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 932);
         };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
     }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
       logout();
        navigate("/");
    };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Velvet Sakura" className={styles.logo_header} />

      <div className={styles.titles}>
        <Link to="/" className={styles.main_title}>
          <h1>Velvet Sakura</h1>
        </Link>
        <h2 className={styles.subtitle_header}>
        {isMobile && user ? (
            <span className={styles.welcome_container}>Bienvenida {user.name}
            <button
                onClick={handleLogout}
                className={styles.logout_icon}
                title="Cerrar sesión">⏻</button>
            </span>
        ) : ("Cartas del destino")}
        </h2>
      </div>

      {user && (
        <div className={styles.field_profile}>
          <button
            onClick={handleLogout}
            className={styles.avatar_btn}
            title="Cerrar sesión">
            <img src={user.avatar || ProfileImg} alt="" className={styles.profile_img}/>
          </button>
          <p className={styles.profile_name}>{user.name}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
