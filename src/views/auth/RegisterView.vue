<script setup>
    import { useUserStore } from '@/stores/user';
    import { inject, ref } from 'vue';

    const toast = inject('toast');
    const user = useUserStore();
    //States locales
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');

    const handleSubmit = async () => {
        const formData = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        }
        // console.log(formData)

        //Validacion frontend
        if (Object.values(formData).some(value => value === undefined || value === '')) {
            toast.open({
                message: 'Todos los campos son requeridos',
                type: 'error'
            })
            return
        }

        if (user.password !== user.password_confirmation) {
            toast.open({
                message: 'La confirmacion de la contraseña no coincide',
                type: 'error'
            })
            return
        }
        //Pasamos el objeto con la info del form al metodo register
        await user.register(formData);
        //Reseteamos los states locales
    };
</script>

<template>
    <h3 class="text-2xl text-center font-bold mb-2">Crea tu cuenta</h3>
    <form 
        @submit.prevent="handleSubmit"
        class="flex flex-col space-y-3"
    >
        <div>
            <label for="name" class="text-slate-700 font-semibold ml-1">Nombre</label>
            <input 
                type="text"
                id="name"
                class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Ingresa tu nombre"
                v-model="name"
            />
        </div>

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

        <div>
            <label for="password_confirmation" class="text-slate-700 font-semibold ml-1">Confirma tu contraseña</label>
            <input 
                type="password"
                id="password_confirmation"
                class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                placeholder="Ingresa tu contraseña"
                v-model="password_confirmation"
            />
        </div>
        
        <input
            type="submit"
            class="bg-green-600 hover:bg-green-700 uppercase text-white w-full p-3 mt-2 font-bold cursor-pointer rounded transition-all"
            value="Crear cuenta"
        />
    </form>
</template>