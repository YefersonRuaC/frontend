import api from "@/lib/axios";

export default {
    //Definimos los endpoints
    register(data) {
        return api.post('/register', data);
    },
    login(data) {
        return api.post('/login', data);
    },
    logout() {
        return api.post('/logout');
    }
}