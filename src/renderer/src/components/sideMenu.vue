<template>
  <div
    class="absolute inset-y-0 left-0 z-10 flex h-full w-64 flex-col border-r bg-background px-4 py-6 sm:px-6 bg-gray-900"
  >
    <div class="flex items-center pb-4 border-b border-b-gray-800">
      <img
        src="../assets/imgs/zapatilla.png"
        alt="Home"
        class="w-8 h-8 rounded object-cover bg-white"
      />
      <span class="text-lg font-bold text-white ml-3">Zapateria</span>
    </div>
    <ul class="menu w-56 rounded-box bg-gray-900 mb-1" data-theme="dark">
      <li v-for="link in links.slice(0, props.index)" :key="link">
        <button
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          @click="handleClick(link, link.url)"
        >
          <Icon :icon="link.icon" width="24" height="24" />
          <span class="text-sm">{{ link.text }}</span>
        </button>
      </li>
      <li>
        <button
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          @click="endSession()"
        >
          <Icon icon="ic:baseline-logout" width="24" height="24" />
          <span class="text-sm">salir</span>
        </button>
      </li>
    </ul>
    <div class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <label class="text-base text-white">{{ props.user }}</label>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import router from '../routes'
import usefetch from '../composable/fectchData'
import { Icon } from '@iconify/vue'
// import Icon from '@iconify/vue'

//const index = ref(2)

const activeOptions = ref(null)

const handleClick = (option, link) => {
  activeOptions.value = option
  router.push(link)
}

const props = defineProps({
  index: Int16Array,
  user: String
})

const links = ref([
  { text: 'facturacion', url: '/factura', icon: 'ic:baseline-receipt-long' },
  { text: 'Ventas', url: '/ventas', icon: 'ic:baseline-attach-money' },
  { text: 'Informes', url: '/informes', icon: 'ic:baseline-bar-chart' },
  { text: 'Inventario', url: '/inventario', icon: 'ic:outline-inventory' },
  { text: 'Usuarios', url: '/usuarios', icon: 'ic:baseline-groups' },
  { text: 'Bitacora', url: '/bitacora', icon: 'ic:baseline-history' }
])

async function endSession() {
  await usefetch('/logins/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  router.push('/')
  sessionStorage.clear()
  toast.info(`Sesion cerrada`)
}
</script>
