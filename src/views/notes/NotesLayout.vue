<script setup>
    import { useUserStore } from '@/stores/user';

    const user = useUserStore();
</script>

<template>
    <header class="w-full py-5 px-4 md:px-32 shadow flex justify-between items-center">
        <RouterLink
            to="/notes"
            class="text-center text-5xl font-bold text-slate-600"
        >
            ToDo
        </RouterLink>
        <button
            @click="user.logout"
            class="bg-red-300 p-2 hover:bg-red-400 text-red-950 font-bold rounded transition-all"
        >
            Cerrar sesion
        </button>
    </header>
    <main class="flex justify-center w-full py-4">
        <RouterView/>
    </main>
</template>