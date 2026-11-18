import api from "./api"

export const getEmployees = async () => {

    const response = await api.get("/users/employees");
    
    // if (!response.ok) {
    //     console.log(response);
    //     throw new Error("Failed to fetch employees");
    // }

    return response.data;
};