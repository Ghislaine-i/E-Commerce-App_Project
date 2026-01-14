import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add auth token and debugging
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("API Request:", config.method.toUpperCase(), config.url);
        if (config.data) {
            console.log("Request data:", config.data);
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging and error handling
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.status, response.config.url);
        console.log("Response data:", response.data);
        return response;
    },
    (error) => {
        console.error("Response error:", error.response?.data || error.message);

        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            console.warn("Unauthorized request - token may be expired");
            // Optionally clear token and redirect to login
            // localStorage.removeItem("token");
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;