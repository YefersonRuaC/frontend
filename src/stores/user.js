import AuthAPI from "@/api/AuthAPI";
import api from "@/lib/axios";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {

    const toast = inject('toast');
    const router = useRouter();
    const user = ref({});

    async function register(formData) {
        try {
            const { data } = await AuthAPI.register(formData);
            // console.log(data)
            toast.open({
                message: data.message,//Mostramos el mensaje que viene desde el back
                type: 'success'
            });
            //Redirijimos a login
            router.push({ name: 'login' });
            
        } catch (error) {
            // console.log(error)
            //Recorremos y mostramos los mensaje de validacion del backend
            Object.values(error.response.data.errors).forEach(messages => 
                toast.open({
                    message: messages[0],
                    type: 'error'
                })
            );
        }
    }

    async function login(formData) {
        try {
            const { data } = await AuthAPI.login(formData);
            // console.log(data)
            //Seteamos el token en localStorage al iniciar sesion
            localStorage.setItem('token', data.token);

            user.value = data.user;
            
            router.push({ name: 'notes' });
            
        } catch (error) {
            // console.log(error)
            const errors = error.response.data.errors;
            if(errors) {
                Object.values(errors).forEach(messages => 
                    toast.open({
                        message: messages[0],
                        type: 'error'
                    })
                );
            } else {
                toast.open({
                    message: error.response.data.error,
                    type: 'error'
                })
            }
        }
    }

    async function logout() {
        await AuthAPI.logout();//usamos el endpoint
        localStorage.removeItem('token');//Removemos el token que valida la sesion
        user.value = {};//Reiniciamos el state del usuario
        router.push({ name: 'login' });
    }

    return {
        user,
        register,
        login,
        logout
    }
})