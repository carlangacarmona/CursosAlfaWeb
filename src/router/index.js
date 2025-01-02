import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Administracion from '../views/Administracion.vue'
import EditarCurso from '../views/EditarCurso.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: Administracion
  },
  {
    path: '/editar/:id',
    name: 'EditarCurso',
    component: EditarCurso
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router