import { createRouter, createWebHistory } from 'vue-router'

//import Home from '../views/loginView.vue'
const Home = () => import('../views/loginView.vue')
const Menu = () => import('../views/dashBoard.vue')
const Factura = () => import('../views/pages/facturacion.vue')
const Ventas = () => import('../views/pages/ventas.vue')
const Informes = () => import('../views/pages/informes.vue')
const Inventario = () => import('../views/pages/inventario.vue')
const Bitacora = () => import('../views/pages/bitacora.vue')
const Usuarios = () => import('../views/pages/usuarios.vue')

const routes = [
  { path: '/', component: Home },
  {
    path: '/menu',
    component: Menu,
    children: [
      { path: '/factura', component: Factura },
      { path: '/ventas', component: Ventas },
      { path: '/informes', component: Informes },
      { path: '/inventario', component: Inventario },
      { path: '/bitacora', component: Bitacora },
      { path: '/usuarios', component: Usuarios }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
