import NotesAPI from "@/api/NotesAPI";
import { defineStore } from "pinia";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

export const useNotesStore = defineStore('notes', () => {

    const toast = inject('toast');
    const router = useRouter();
    const notes = ref([]);
    const titulo = ref('');
    const categoria = ref('');
    const descripcion = ref('');
    const noteId = ref('');
    const vencimiento = ref('');
    const imagen = ref('');
    
    async function getNotes() {
        try {
            const { data } = await NotesAPI.getByUserId();
            // console.log(data);
            notes.value = data.data;//Llenamos el state con la respuesta de la API
            
        } catch (error) {
            console.log(error)
        }
    }

    async function createNote(formData) {
        try {
            const { data } = await NotesAPI.create(formData);
            // console.log(data)
            toast.open({
                message: data.message,
                type: 'success'
            })

            router.push({ name: 'notes' })

        } catch (error) {
            // console.log(error)
            Object.values(error.response.data.errors).forEach(messages => 
                toast.open({
                    message: messages[0],
                    type: 'error'
                })
            );
        }
    }

    //Obtener la info y el id de la nota a la cual se dio click
    function getEditingNote(id, note) {
        titulo.value = note.titulo;
        categoria.value = note.categoria;
        descripcion.value = note.descripcion;
        vencimiento.value = note.vencimiento;
        imagen.value = note.imagen;
        noteId.value = id;
        // console.log(note)

        router.push({ name: 'save-note' });
    }

    async function updateNote(id, formData) {
        try {
            const { data } = await NotesAPI.update(id, formData)
            // console.log(data.message)
            toast.open({
                message: data.message,
                type: 'info'
            })

            router.push({ name: 'notes' });
            resetNoteState();

        } catch (error) {
            // console.log(error)
            Object.values(error.response.data.errors).forEach(messages => 
                toast.open({
                    message: messages[0],
                    type: 'error'
                })
            );
        }
    }

    async function deleteNote(id) {
        try {
            //Confirmacion nativa de Js
            if(confirm(`¿Esta seguro de eliminar esta nota?`)){
                const { data } = await NotesAPI.delete(id);
                // console.log(data.message)
                toast.open({
                    message: data.message,
                    type: 'success'
                })
                //Obtenemos las notas de manera reactiva
                getNotes();
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Resetear el state de la nota y no tener inconvenientes al crear una nueva
    function resetNoteState() {
        titulo.value = '';
        categoria.value = '';
        descripcion.value = '';
        noteId.value = '';
        vencimiento.value = '';
        imagen.value = null;
    }

    return {
        getNotes,
        createNote,
        getEditingNote,
        updateNote,
        deleteNote,
        notes,
        titulo,
        categoria,
        descripcion,
        noteId,
        vencimiento,
        imagen,
        resetNoteState
    }
})