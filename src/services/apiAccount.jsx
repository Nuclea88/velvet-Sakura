import axios from "axios";

const apiAccount=()=>{
    const url="http://localhost:3000/accounts";

    const getAccount = async () => {
        try{
            const response = await axios.get(url);
            return response.data;
            } catch (error) {
                if (error.response) {
                    alert(`Error de la API (${error.response.status})`);
                } else if (error.request) {
                    alert("No se pudo conectar con la base de datos");
                } else {
                    alert("Ocurrió un error inesperado");
                }
                throw error;
            }
    }

    const addAccount = async (dataForm) => {
        const response = await axios.post(url, dataForm);
        return response.data;
}
        
        
    const editAccount = async (id,name) => {
        const response = await axios.put(`${url}/${id}`, { name });
        return response.data;
    }

    const getByName = async (name) => {
        const response = await axios.get(`${url}?name=${name}`);
         return response.data;
    };

    return { getAccount, addAccount, editAccount, getByName}
}

export default apiAccount;