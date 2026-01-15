import styles from "./check-button.module.css";

const CheckButton = ({ onSave }) => {
    return (
        <button 
            className={styles.checkIcon} 
            onClick={onSave}
            title="Guardar cambios"
        >
            {/* Puedes usar un emoji o un SVG si prefieres */}
            ✅
        </button>
    );
};

export default CheckButton;