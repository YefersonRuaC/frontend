<script setup>
    import { useNotesStore } from '@/stores/notes';
    import { inject, onMounted, ref } from 'vue';
    import { format } from 'date-fns';

    const notes = useNotesStore();
    const toast = inject('toast');
    const minDate = ref('');

    //Cuando cargue est vista, formateamos la hora
    onMounted(() => {
        const today = new Date();
        minDate.value = format(today, 'yyyy-MM-dd');
    });

    const imageUpload = (event) => {
        //Llenamos el satte con el archivo seleccionado
        notes.imagen = event.target.files[0];
        console.log(notes.imagen)
    }

    const handleSubmit = async () => {
        if (!notes.titulo || !notes.categoria || !notes.descripcion) {
            toast.open({
                message: 'Los campos titulo, categoria y descripcion son requeridos',
                type: 'error'
            })
            return
        }

        const formData = {
            titulo: notes.titulo,
            categoria: notes.categoria,
            descripcion: notes.descripcion,
            vencimiento: notes.vencimiento
        }

        if (notes.imagen) {
            formData.imagen = notes.imagen
        }
        // console.log(formData)

        if(notes.noteId) {
            await notes.updateNote(notes.noteId, formData)
        } else {
            await notes.createNote(formData);
        }
    }
</script>

<template>
    <div class="w-full md:w-1/2 p-3 md:p-0 mt-4">
        <h3 class="text-2xl text-center font-bold mb-2">
            {{ notes.noteId ? 'Actualizar nota' : 'Crea una nueva nota' }}
        </h3>
        <form 
            @submit.prevent="handleSubmit"
            class="flex flex-col space-y-3"
        >
            <div>
                <label for="titulo" class="text-slate-700 font-semibold ml-1">Titulo</label>
                <input 
                    type="text"
                    id="titulo"
                    class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                    placeholder="Ingresa el titulo"
                    v-model="notes.titulo"
                />
            </div>
            
            <div>
                <label for="categoria" class="text-slate-700 font-semibold ml-1">Categoria de la nota</label>
                <select
                    id="categoria"
                    class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                    v-model="notes.categoria"
                >
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option value="Personal">Personal</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
    
            <div>
                <label for="vencimiento" class="text-slate-700 font-semibold ml-1">Fecha de vencimiento (opcional)</label>
                <input 
                    type="date"
                    id="vencimiento"
                    class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                    v-model="notes.vencimiento"
                    :min="minDate"
                />
            </div>
    
            <div>
                <label for="descripcion" class="text-slate-700 font-semibold ml-1">Descripcion</label>
                <textarea
                    id="descripcion"
                    class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                    placeholder="Ingresa la descripcion"
                    rows="5"
                    v-model="notes.descripcion"
                ></textarea>
            </div>

            <div>
                <label for="imagen" class="text-slate-700 font-semibold ml-1">Imagen (opcional)</label>
                <input 
                    type="file"
                    id="imagen"
                    class="mt-1 w-full p-3 shadow bg-gray-50 rounded"
                    accept="image/*"
                    @change="imageUpload"
                />
            </div>
            
            <button
                type="submit"
                class="uppercase text-white w-full p-3 mt-2 font-bold cursor-pointer rounded transition-all"
                :class="notes.noteId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'"
            >{{ notes.noteId ? 'Actualizar nota' : 'Crear nota' }}</button>
        </form>
    </div>
</template>