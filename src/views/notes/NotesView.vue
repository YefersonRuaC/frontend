<script setup>
    import Note from '@/components/Note.vue';
    import { useNotesStore } from '@/stores/notes';
    import { onMounted } from 'vue';

    const notes = useNotesStore();

    onMounted( async() => {
        await notes.getNotes();
        // console.log(notes.notes)
    });

    const handleClick = () => {
        notes.resetNoteState();
    }
</script>

<template>
    <div class="mx-auto container py-3 px-6">
        <div class="pb-5 px-1 md:px-10 flex justify-between items-center">
            <h3 class="text-xl md:text-3xl font-bold uppercase">Notas</h3>
            <RouterLink
                :to="{ name: 'save-note' }"
                @click="handleClick"
                class="bg-green-500 p-2 rounded font-bold text-white hover:bg-green-600 transition-all"
            >
                Agregar nota
            </RouterLink>
        </div>
        <p v-if="notes.notes.length === 0" class="text-center text-lg font-normal text-gray-400 uppercase">
            Aun no has creado notas
        </p>
        <div 
            v-else
            class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <Note 
                v-for="note in notes.notes"
                :key="note.id"
                :note="note"
            />
        </div>
    </div>
</template>