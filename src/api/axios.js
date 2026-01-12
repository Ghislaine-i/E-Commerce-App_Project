import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log("API Request:", config.method.toUpperCase(), config.url);
        console.log("Request data:", config.data);
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.status, response.data);
        return response;
    },
    (error) => {
        console.error("Response error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;