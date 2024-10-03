import axios from "axios";

//Definimos el axios client
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

//Registramos el interceptor a la instacia de 'api'. Asi se aplica a todos los request que se envian al back
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`//Agregar autorizacion al header usando Bearer
    }
    return config
});

export default api