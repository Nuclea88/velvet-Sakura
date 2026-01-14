//Página de prueba para redirigir resultados mientras se van construyendo los contenidos
//Borrar cuando el proyecto esté finalizado. Borrar también del router.
import { useLocation } from "react-router";

const Prueba = () => {
  const { state } = useLocation();

  const { past, present, future } = state || {};

  if (!state) {
    return <p>No hay cartas seleccionadas</p>;
  }

  return (
    <div style={{display:"flex"}}>
      <h2>Resultado de la tirada</h2>

      <div>
        <h3>Pasado</h3>
        <p>{past.spanishName}</p>
        <img src={past.sakuraCard} />
        <p>{past.meaning}</p>
        <p>{past.id}</p>
      </div>

      <div>
        <h3>Presente</h3>
        <p>{present.spanishName}</p>
        <img src={present.sakuraCard} />
        <p>{present.meaning}</p>
        <p>{present.id}</p>
      </div>

      <div>
        <h3>Futuro</h3>
        <p>{future.spanishName}</p>
        <img src={future.sakuraCard} />
        <p>{future.meaning}</p>
        <p>{future.id}</p>
      </div>
    </div>
  );
};

export default Prueba;