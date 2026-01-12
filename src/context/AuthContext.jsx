import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = localStorage.getItem("user");
        if (savedUser && savedUser !== "null" && savedUser !== "undefined") {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing saved user:", error);
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post("/auth/login", {
                username,
                password,
                expiresInMins: 30
            });

            if (response.data && response.data.token) {
                const userData = response.data;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                return { success: true, data: userData };
            }

            return { success: false, message: "Invalid credentials" };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed. Please try again."
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};