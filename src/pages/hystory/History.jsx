 const History = () => {
    const storedUser = localStorage.getItem('user');
    const name = storedUser ? storedUser.name : "Invitada";
    return (
         <>
            <div>
            <h3>Bienvenida {name} a tu historial de lecturas</h3>
            <p>Para eliminar un historial haz click en Eliminar</p>
            <p>Para borrar el  historial haz click en Borrar</p>
            </div>
            <div>
                <button>E</button>
                <span>Editar nombre usuario</span>
            </div>
            <section>
              aqui el organismo q renderiza las tiradas, incluido el boton de borrar 
            </section>
        </>
) } 
 export default History; 