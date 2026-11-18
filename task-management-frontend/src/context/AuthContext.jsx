import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData) => {

        setUser(userData);
        setToken(userData.token);

        setAuthToken(userData.token);
    };

    const logout = () => {

        setUser(null);
        setToken(null);

        setAuthToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};