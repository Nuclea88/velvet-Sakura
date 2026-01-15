import styles from "./profile-reading.module.css";
import SavedReading from "../../components/organisms/SavedReading/SavedReading";



export default function ProfileReading() {

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>
        Tu lectura {lectura.name}
      </h2>

      <SavedReading />
    </section>
  );
}