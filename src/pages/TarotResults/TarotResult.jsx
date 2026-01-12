import styles from "./tarot-results.module.css";

export default function TarotResult() {
  return (
    <section className={`${styles.container} flex flex-col gap-10`}>
      
      {/* Título da SEÇÃO, não da app */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Resultado de la Lectura</h2>
        <p className="opacity-70 mt-1">Pasado · Presente · Futuro</p>
      </div>

      <div className={`${styles.cards} grid grid-cols-1 md:grid-cols-3 gap-6`}>
        
        <div className={styles.cardBlock}>
          <h3 className={styles.cardTitle}>Pasado</h3>
          <p className={styles.keyword}>Viento</p>
          <p className={styles.description}>Descripción aquí</p>
        </div>

        <div className={styles.cardBlock}>
          <h3 className={styles.cardTitle}>Presente</h3>
          <p className={styles.keyword}>Sombra</p>
          <p className={styles.description}>Descripción aquí</p>
        </div>

        <div className={styles.cardBlock}>
          <h3 className={styles.cardTitle}>Futuro</h3>
          <p className={styles.keyword}>Vuelo</p>
          <p className={styles.description}>Descripción aquí</p>
        </div>

      </div>

      <footer className="flex justify-center gap-4">
        <button className={styles.primaryButton}>Guardar</button>
        <button className={styles.secondaryButton}>Reiniciar</button>
      </footer>

    </section>
  );
}
