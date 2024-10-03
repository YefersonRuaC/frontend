<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const authRoutes = [
        { name: 'register', text: 'Crear cuenta' },
        { name: 'login', text: 'Iniciar sesion' }
    ];
</script>

<template>
    <header class="w-full py-5 px-10 shadow flex justify-center md:justify-start">
        <RouterLink 
            to="/"
            class="text-5xl font-bold text-slate-600"
        >ToDo</RouterLink>
    </header>
    <main class="w-full md:w-1/3 p-3 md:p-0 mt-4">
        <RouterView />
        <div class="flex justify-center mt-5">
            <RouterLink
                v-for="authRoute in authRoutes"
                :to="{ name: authRoute.name }"
                class="bg-gray-50 hover:bg-gray-200 p-3 underline transition-all rounded font-bold"
                :class="{ 'hidden' : route.name === authRoute.name }"
            >
                {{ authRoute.text }}
            </RouterLink>
        </div>
    </main>
</template>