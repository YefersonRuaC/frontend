<script setup>
    import { useNotesStore } from '@/stores/notes';
    import { format } from 'date-fns';
    import { es } from 'date-fns/locale';

    const notes = useNotesStore();

    const props = defineProps({
        note: {
            type: Object
        }
    })

    //Formateando la fecha de creacion de la nota
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMMM, yyyy', { locale: es });
    }

    //Tomando la imagen desde el storage
    const getImageUrl = (imagen) => {
        const storageURL = import.meta.env.VITE_STORAGE_URL
        const imageURL = `${storageURL}/storage/${imagen}`;
        // console.log(imageURL)
        return imageURL
    };
</script>

<template>
    <div class="w-full h-auto flex flex-col justify-between rounded-lg border border-gray-300 p-3 shadow hover:border-green-300">
        <div class="flex justify-between items-center px-4 pb-1">
            <div>
                <h3 class="font-bold text-xl">{{ props .note.titulo }}</h3>
                <p class="text-gray-500 font-semibold">{{ props.note.categoria }}</p>
            </div>
            <p class="underline rounded-xl text-center uppercase">{{ props.note.user.name }}</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center py-2 border-t border-b gap-1">
            <div v-if="props.note.imagen" class="pb-">
                <img :src="getImageUrl(props.note.imagen)" alt="Note Image" class="w-24 h-auto" />
            </div>
            <p class="text-sm flex-1 text-center">{{ props.note.descripcion }}</p>
        </div>
        <div class="flex items-center justify-between mt-1">
            <div>
                <p class="font-semibold text-sm">Creada el: 
                    <span class="font-normal text-base">{{ formatDate(props.note.created_at) }}</span>
                </p>
                <p v-if="props.note.vencimiento" class="font-semibold text-sm">Fecha vencimiento: 
                    <span class="font-normal text-base">{{ formatDate(props.note.vencimiento) }}</span>
                </p>
            </div>
            <div class="flex gap-2">
                <button 
                    @click="notes.getEditingNote(props.note.id, props.note)"
                    class="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>                                    
                </button>
                <button 
                    @click="notes.deleteNote(props.note.id)"
                    class="p-2 rounded bg-red-700 hover:bg-red-800 text-white flex items-center justify-center transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                             
                </button>
            </div>
        </div>
    </div>
</template>