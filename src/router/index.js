import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        }
      ]
    },
    {
      path: '/notes',
      component: () => import('@/views/notes/NotesLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'notes',
          component: () => import('@/views/notes/NotesView.vue')
        },
        {
          path: 'save',
          name: 'save-note',
          component: () => import('@/views/notes/SaveNoteView.vue')
        }
      ]
    }
  ]
})
//Navigation guard
router.beforeEach( async(to, from, next) => {
  //Verificar si la ruta requiere o no un usuario autenticado 
  const requiresAuth = to.matched.some( (url) => url.meta.requiresAuth );
  // console.log(requiresAuth)
  if(requiresAuth) {
    //Si lo requiere tomamos el token
    const token = localStorage.getItem('token');
    if(!token) {
      //Si no hay token, lo mandamos a login
      return next({ name: 'login' });
    }
  }
  //Si no requiere autenticacion, permitimos la navegacion y mostramos la vista
  next();
});

export default router
