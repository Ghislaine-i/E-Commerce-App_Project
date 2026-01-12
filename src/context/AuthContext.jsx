import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            console.log("Attempting login with:", { username, password });
            console.log("Making request to: https://dummyjson.com/auth/login");

            // DummyJSON login endpoint
            const response = await axios.post(
                "https://dummyjson.com/auth/login",
                {
                    username: username,
                    password: password,
                    expiresInMins: 30,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log("Full API Response:", response);
            console.log("Response data:", response.data);
            console.log("Response status:", response.status);

            // Check if we got a valid response
            if (!response.data) {
                console.error("No data in response");
                return {
                    success: false,
                    message: "No data received from server"
                };
            }

            // Check for token in response
            if (!response.data.token && !response.data.accessToken) {
                console.error("No token in response:", response.data);
                return {
                    success: false,
                    message: "Authentication failed - no token received"
                };
            }

            // DummyJSON may use either 'token' or 'accessToken'
            const token = response.data.token || response.data.accessToken;

            // Store user data and token
            const userData = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                gender: response.data.gender,
                image: response.data.image,
            };

            console.log("Setting user data:", userData);

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);

            if (response.data.refreshToken) {
                localStorage.setItem("refreshToken", response.data.refreshToken);
            }

            return { success: true, data: userData };

        } catch (error) {
            console.error("Login error - Full error object:", error);
            console.error("Error response:", error.response);
            console.error("Error message:", error.message);

            // Handle different error types
            if (error.response) {
                // Server responded with error
                console.error("Server error status:", error.response.status);
                console.error("Server error data:", error.response.data);

                return {
                    success: false,
                    message: error.response.data.message ||
                        `Server error: ${error.response.status}` ||
                        "Invalid username or password"
                };
            } else if (error.request) {
                // Request made but no response
                console.error("No response received:", error.request);
                return {
                    success: false,
                    message: "Network error. Please check your connection and try again."
                };
            } else {
                // Something else went wrong
                console.error("Error setting up request:", error.message);
                return {
                    success: false,
                    message: "An unexpected error occurred: " + error.message
                };
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    // Get auth token for API requests
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const value = {
        user,
        login,
        logout,
        getToken,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};