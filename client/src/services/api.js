import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    return config
}, (error) => {
    if(error.response?.status === 401){
        window.location.href = "/login";
    }
    return Promise.reject(error);
})

export default instance;