import axios from "axios";

const apiReading=()=>{
    const url="http://localhost:3000/readings";
    

    /*const addReading = async (dataForm) => {
        const response = await axios.post(url, dataForm);
        return response.data;*/

    const getByUserId = async (userId) => {
        const response = await axios.get(`${url}?userId=${userId}`);
         return response.data;
    };
        
    const editName = async (id,name) => {
        const response = await axios.patch(`${url}/${id}`, { name });
        return response.data;
    }

    
    const deleteReading = async (id) => {
        const stringId = String(id); //se podria borrar?
        const response = await axios.delete(`${url}/${id}`);
        return response;
    }
    
    return { getByUserId, editName, deleteReading}
}

export default apiReading;