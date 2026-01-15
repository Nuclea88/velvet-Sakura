//Página de prueba para redirigir resultados mientras se van construyendo los contenidos
//Borrar cuando el proyecto esté finalizado. Borrar también del router.
import { useLocation } from "react-router";

const Prueba = () => {
  const { state } = useLocation();
console.log(state);
  const { past, present, future } = state || {};

  if (!state) {
    return <p>No hay cartas seleccionadas</p>;
  }else{
  }

  return (
    <div style={{display:"flex"}}>
      <h2>Resultado de la tirada</h2>
    </div>
      
  );
};

export default Prueba;
