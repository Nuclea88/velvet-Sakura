

import BoardCards from '../../components/organisms/BoardCards/BoardCards';
import styles from "./start.module.css";

const Start = () => {
    
    
    return (
        <>
            <h2 className={styles.title_start}>Elige 3 cartas para el orden de pasado, presente y futuro</h2>
            <BoardCards/>
        </>
    );
}

export default Start;