import axios from "axios";

const apiReading=()=>{
    const url="http://localhost:3000/readings";

    const getByUserId = async (userId) => {
        const response = await axios.get(`${url}?userId=${userId}`);
         return response.data;
    };
        
    const editName = async (id,name) => {
        const response = await axios.patch(`${url}/${id}`, { name });
        return response.data;
    }

    
    const deleteReading = async (id) => {
        const response = await axios.delete(`${url}/${id}`);
        return response;
    }
    
    return { getByUserId, editName, deleteReading}
}

export default apiReading;