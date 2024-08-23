<template>
  <div class="bg-white w-[400px] dark:bg-gray-900 p-8 rounded shadow-md px-10 py-10 border bg-card">
    <h2 class="text-2xl font-semibold mb-10">Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div class="mb-7">
        <inputUser v-model="username"></inputUser>
      </div>
      <div class="mb-7">
        <inputPassword v-model="password"></inputPassword>
      </div>
      <div class="ml-[95px]">
        <button type="submit" class="btn btn-outline btn-success">Iniciar sesión</button>
      </div>
    </form>
  </div>
  <alert id="my_modal_5">
    <template #text>{{ error }}</template>
  </alert>
</template>

<script setup>
//import { data } from 'autoprefixer'
import router from '../routes'
import { toast } from 'vue-sonner'
import inputUser from '../components/loginBox/inputUsername.vue'
import inputPassword from '../components/loginBox/inputPassword.vue'
import fetchData from '../composable/fectchData.js'
import alert from '../components/alert.vue'
import { ref } from 'vue'

let error = ref('')

const password = ref('')
const username = ref('')
let userData = ref([])

async function login() {
  console.log('form submited')

  try {
    const data = await fetchData(`/logins/${username.value}/${password.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    userData.value = data.value
    console.log(data.value)
    // console.log(userData.value)
  } catch (err) {
    console.log(err)
  }

  if (usuarioNoExiste()) {
    error.value = 'usuario no existe'
    toast.error('usuario no existe')
    return
  }

  if (usuarioInhabilitado()) {
    error.value = 'usuario inhabilitado'
    return
  }

  if (contrasenaErronea()) {
    error.value = 'contraseña erronea'
    toast.warning('contraseña erronea')
    return
  }

  createSession()
  //resetTextBoxs()
  pushRoute()
  resetTextBoxs()
}

function usuarioInhabilitado() {
  if (userData.value.error == 'user disabled') {
    mostrarModal()
    return true
  }
  return false
}

function usuarioNoExiste() {
  if (userData.value.error == 'user dont exist') return true
  return false
}

function contrasenaErronea() {
  if (userData.value.error === 'Not allowd') return true
  return false
}

function mostrarModal() {
  document.getElementById('my_modal_5').showModal()
}

function resetTextBoxs() {
  username.value = ''
  password.value = ''
}

/*
      <p>username: {{ username }}</p>
      <p>password: {{ password }}</p>
      <p>userdata: {{ userData }}</p>
      <p>Error: {{ error }}</p>
*/

function createSession() {
  sessionStorage.setItem('datosUsuario', JSON.stringify(userData.value[0]))
}

function pushRoute() {
  router.push('/menu')
}
</script>
