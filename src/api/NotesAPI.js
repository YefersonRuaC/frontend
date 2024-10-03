import api from "@/lib/axios";

export default {
    getByUserId() {
        return api.get('/notes');
    },
    create(data) {
        return api.post('/notes', data, {
            headers: {
                //Para poder mandar campos de formularios y archivos en la req a la API
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
    update(id, data) {
        return api.put(`/notes/${id}`, data);
    },
    delete(id) {
        return api.delete(`/notes/${id}`);
    }
}