//Página de prueba para redirigir resultados mientras se van construyendo los contenidos
//Borrar cuando el proyecto esté finalizado. Borrar también del router.
import { useLocation } from "react-router";

const Prueba = () => {
  const { state } = useLocation();

  const { pasado, presente, futuro } = state || {};

  if (!state) {
    return <p>No hay cartas seleccionadas</p>;
  }

  return (
    <div>
      <h2>Resultado de la tirada</h2>

      <div>
        <h3>Pasado</h3>
        <img src={pasado.sakuraCard} />
        <p>{pasado.meaning}</p>
      </div>

      <div>
        <h3>Presente</h3>
        <img src={presente.sakuraCard} />
        <p>{presente.meaning}</p>
      </div>

      <div>
        <h3>Futuro</h3>
        <img src={futuro.sakuraCard} />
        <p>{futuro.meaning}</p>
      </div>
    </div>
  );
};

export default Prueba;