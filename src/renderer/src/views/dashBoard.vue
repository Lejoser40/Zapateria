<template>
  <div>
    <sideMenu v-if="true" :index="datosUsuario.rol" :user="datosUsuario.nombre"></sideMenu>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import sideMenu from '../components/sideMenu.vue'
//import headerC from '../components/header.vue'

const datosUsuario = ref([])

onMounted(() => {
  getUserData()
  toast.success('Inicio de session con exito')
})

function getUserData() {
  const data = sessionStorage.getItem('datosUsuario')
  datosUsuario.value = JSON.parse(data)
  console.log(datosUsuario.value)
}
</script>
