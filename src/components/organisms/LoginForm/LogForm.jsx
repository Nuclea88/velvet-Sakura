import styles from "./log-form.module.css";
import Button from "../../atoms/Button/Button";
import { Link } from "react-router";
import apiAccount from "../../../services/apiAccount";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import Avatar from "../../../assets/images/profile_image.png";
import useAuth from "../../../hooks/useAuth";

function LogForm(){
    const [form, setForm] = useState({name: "", email: "", password:""})
    const [accounts, setCAccounts] = useState([
    ])
    const dbAccount = apiAccount();
    const navigate = useNavigate();
    const { login } = useAuth();


    useEffect(() => {
        dbAccount.getAccount().then(data => {
            console.log(data)
            setCAccounts(data)
        })
    }, [])

    const handleChange = (event) => {
            const { name, value } = event.target;
            setForm({
                ...form,
                [name]:value
            })
        }
    
    const handleSubmit = async (event) => {
          event.preventDefault();
          if (!form.name || !form.password) {
          alert("Completa todos los campos");
          return;
          }
          try {
            const response = await dbAccount.getByName(form.name);
            if (response.length === 0) {
              alert("El usuario no existe");
              return;
          }
            const user = response[0];
            if (user.password !== form.password) {
              alert("Contraseña incorrecta");
              return;
          }
         const loggedUser = { 
            ...user,
            avatar: Avatar 
        };
        login(loggedUser);
        navigate("/readings");
      } catch (error) {
        alert("Error al conectar con el servidor");
      }
};
    

    return(
        <>
        <form className={styles.login_form} onSubmit={handleSubmit}>
            <div className={styles.field_form}>
            <label htmlFor="name" className={styles.label_login}>Introduce un alias:</label>
            <input type="text" id="name" name="name" accessKey="n" tabIndex={1} className={styles.input_login} onChange={handleChange}/>
            </div>

            <div className={styles.field_form}>
            <label htmlFor="password" className={styles.label_login}>Introduce una contraseña:</label>
            <input type="password" id="password" name="password" accessKey="p" tabIndex={2} className={styles.input_login} onChange={handleChange}/>
            </div>

            <div className={styles.fieldbtn_form}>
            <Button BtnClass="subm_btn" text="Confirmar" path="" />
            <Link to="/register" className={styles.register}>Regístrate</Link>
            </div>
        </form>
        </>
    )
}
export default LogForm;