import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginUser = async (email, password) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            email: email,
            password: password
        }
    );

    return response.data;
};

export const registerUser = async (userData) => {

    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};