console.log(import.meta.env.VITE_REACT_APP_API_BASE_URL, 'import.meta.env.VITE_REACT_APP_API_BASE_URL')
const config = {
    apiBaseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000/api",
};

export default config;