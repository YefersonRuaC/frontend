<script setup>
    import { useUserStore } from '@/stores/user';
    import { inject, ref } from 'vue';

    const toast = inject('toast');
    const user = useUserStore();
    //States locales
    const email = ref('');
    const password = ref('');

    function resetLoginForm() {
        email.value = '',
        password.value = ''
    }

    const handleSubmit = async () => {
        const formData = {
            email: email.value,
            password: password.value
        }

        if (Object.values(formData).some(value => value === undefined || value === '')) {
            toast.open({
                message: 'Todos los campos son requeridos',
                type: 'error'
            })
            return
        }

        await user.login(formData);

        resetLoginForm();
    }
</script>

<template>
    <h3 class="text-2xl text-center font-bold mb-4">Inicio de sesion</h3>
    <form 
        @submit.prevent="handleSubmit"
        class="flex flex-col space-y-3"
    >
        <div>
            <label for="email" class="text-slate-700 font-semibold ml-1">Correo electronico</label>
            <input 
                type="email"
                id="email"
                class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Ingresa tu email"
                v-model="email"
            />
        </div>

        <div>
            <label for="password" class="text-slate-700 font-semibold ml-1">Contraseña</label>
            <input 
                type="password"
                id="password"
                class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Ingresa tu contraseña"
                v-model="password"
            />
        </div>
        
        <input
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 uppercase text-white w-full p-3 mt-2 font-bold cursor-pointer rounded transition-all"
            value="Iniciar sesion"
        />
    </form>
</template>