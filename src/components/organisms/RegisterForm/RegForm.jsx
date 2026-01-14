import styles from "./reg-form.module.css";
import Button from "../../atoms/Button/Button";
import apiAccount from "../../../services/apiAccount";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { checkEmailExists } from "../../../services/checkEmail";
import { checkNameExists } from "../../../services/checkName";

function RegForm(){
  const [form, setForm] = useState({name: "", email: "", password:""})
  const [accounts, setCAccounts] = useState([
    ])
  const dbAccount = apiAccount();
  const navigate = useNavigate();
  const patterName=/^\S+$/;
  const patternEmail=/^([A-Za-z0-9_-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
  const [formErrors, setFormErrors] = useState({
      name: "",
      email: "",
      password: "",
    });
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
        if (!form.name.trim() || !form.email || !form.password) {
          alert("Se requieren todos los campos");
          return;
        }

        
        const existsName = await checkNameExists(form.name);
        const existsEmail = await checkEmailExists(form.email);
        const newErrors = {
          name: validateName(form.name, existsName),
          email: validateEmail(form.email, existsEmail),
          password: validatePassword(form.password),
        };
        setFormErrors(newErrors);

      if (Object.values(newErrors).some(err => err)) {
        alert("Corrige los errores");
      return;
  }

    const res = await dbAccount.addAccount(form);
    setCAccounts(prev => [...prev, res]);
    navigate("/info", { state: res });
};

  const validateName = (value,exists) => {
    if (value.trim() === "") return "Campo vacío";
    if (value.trim().length < 2) return "Debe tener mínimo 2 carácteres";
    if (!patterName.test(value)) return "No se aceptan espacios en blanco";
    if (exists) return "Ya está registrado";
    return "";
  };
  const validateEmail = (value,exists) => {
    if (value.trim() === "") return "Campo vacío";
    if (!patternEmail.test(value)) return "Email no válido";
    if (exists) return "Ya está registrado";
    return "";
  };
  const validatePassword = (value) => {
    if (value.trim() === "") return "Campo vacío";
    if (value.trim().length < 8) return "Debe tener al menos 8 carácteres";
    if(/\s/.test(value)) return "No puede contener espacios";
    return "";
  };

    return(
        <>
        <form className={styles.reg_form} onSubmit={handleSubmit}>
            <div className={styles.field_form}>
            <label htmlFor="name" className={styles.label_login}>Introduce un alias:</label>
            <input type="text" id="name" name="name" accessKey="n" tabIndex={1} className={styles.input_login} onChange={handleChange}/>
            <span id="nameError" className={`error ${formErrors.name ? styles.visible : ""}`}>
                {formErrors.name || "\u00A0"}
            </span>
            </div>

            <div className={styles.field_form}>
            <label htmlFor="email" className={styles.label_login}>Introduce un correo electrónico:</label>
            <input type="email" id="email" name="email" accessKey="e" tabIndex={2} className={styles.input_login} onChange={handleChange}/>    
            <span id="emailError" className={`error ${formErrors.email ? styles.visible : ""}`}>
                {formErrors.email || "\u00A0"}
            </span>
            </div>

            <div className={styles.field_form}>
            <label htmlFor="password" className={styles.label_login}>Introduce una contraseña:</label>
            <input type="password" id="password" name="password" accessKey="p" tabIndex={3} className={styles.input_login} onChange={handleChange}/>
            <span id="passError" className={`error ${formErrors.password ? styles.visible : ""}`}>
                {formErrors.password || "\u00A0"}
            </span>
            </div>

            <div className={styles.fieldbtn_form}>
            <Button BtnClass="subm_btn" text="Confirmar" path="" />
            </div>
        </form>
        </>
    )
}

export default RegForm;