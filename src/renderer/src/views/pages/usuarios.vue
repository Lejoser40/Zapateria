<script setup>
import { onMounted, ref } from 'vue'
import usefetch from '../../composable/fectchData'
import TextBox from '../../components/Iventario/textBox.vue'
import { toast } from 'vue-sonner'

let usuarios = ref([])

let nombre = ref('')
let apellido = ref('')
let correo = ref('')
let dni = ref('')
let telefono = ref('')
let rol = ref('')

let username = ref('')
let password = ref('')
let inhabilitado = ref(false)

const selectedRow = ref(null)
const btnAgregar = ref(true)
const btnActualizar = ref(false)

onMounted(() => {
  loadUsuarios()
})

const resetPage = () => {
  loadUsuarios()
  nombre.value = ''
  apellido.value = ''
  correo.value = ''
  dni.value = ''
  telefono.value = ''
  rol.value = ''

  username.value = ''
  password.value = ''
  inhabilitado.value = false

  btnAgregar.value = true
  btnActualizar.value = false
}

const handleRowClick = (row) => {
  selectedRow.value = row
  btnAgregar.value = false
  btnActualizar.value = true

  nombre.value = selectedRow.value.nombre
  apellido.value = selectedRow.value.apellido
  correo.value = selectedRow.value.email
  dni.value = selectedRow.value.DNI
  telefono.value = selectedRow.value.telefono
  rol.value = selectedRow.value.rol

  username.value = selectedRow.value.username
  password.value = selectedRow.value.password
  inhabilitado.value = Boolean(selectedRow.value.inhabilidato)

  console.log(selectedRow.value)
}

async function loadUsuarios() {
  const result = await usefetch('/usuarios', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  usuarios.value = result.value
}

async function addUsuario() {
  const js = JSON.stringify(getBody())

  const result = await usefetch('/usuarios', {
    method: 'POST',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log('resultado')
  console.log(result.value)
  displayToast('Usuario agregado con exito')

  await addLogin(result.value[0].id)

  loadUsuarios()
}

async function addLogin(idUsuario) {
  const js = JSON.stringify(getBodyLogin(idUsuario))

  const result = await usefetch('/logins/', {
    method: 'POST',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
}

async function updateUser() {
  const js = JSON.stringify(getBodyUpdate())

  const result = await usefetch('/usuarios', {
    method: 'PUT',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  displayToast('Usuario actualizado con exito')

  await updateLogin()

  loadUsuarios()
}

async function updateLogin() {
  const js = JSON.stringify(getBodyLoginUpdate())

  const result = await usefetch('/logins/', {
    method: 'PUT',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
}

async function deleteUser() {
  const id = selectedRow.value.id
  const result = await usefetch(`/logins/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  displayToast('Usuario Eliminado con exito')

  loadUsuarios()
}

function displayToast(msg) {
  toast.info(`${msg}`)
}

function getBody() {
  const body = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: correo.value,
    DNI: dni.value,
    telefono: telefono.value,
    rol: parseInt(rol.value)
  }
  return body
}

function getBodyLogin(idUsuario) {
  const body = {
    id_usuario: idUsuario,
    username: username.value,
    password: password.value,
    inhabilidato: inhabilitado.value
  }
  return body
}

function getBodyLoginUpdate() {
  const body = {
    id_usuario: selectedRow.value.id,
    username: username.value,
    inhabilidato: inhabilitado.value
  }
  return body
}

function getBodyUpdate() {
  const body = {
    id: selectedRow.value.id_usuario,
    nombre: nombre.value,
    apellido: apellido.value,
    email: correo.value,
    DNI: dni.value,
    telefono: telefono.value,
    rol: parseInt(rol.value)
  }
  return body
}
</script>
<template lang="">
  <!-- Modal 1 -->
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Alerta!</h3>
      <p class="py-4">¿Desea eliminar este producto?</p>
      <div class="modal-action">
        <form method="dialog" class="flex justify-between">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-neutral" @click="deleteUser()">Si</button>
          &nbsp; &nbsp; &nbsp;
          <button class="btn">No</button>
        </form>
      </div>
    </div>
  </dialog>

  <div class="grid grid-cols-2 gap-4">
    <!-- Tabla -->
    <div
      class="w-[650px] h-[900px] ml-[450px] rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col space-y-1.5 p-4">
        <p class="text-sm font-semibold text-muted-foreground">Lista Usuarios</p>
      </div>
      <div class="block overflow-auto w-full h-[750px]">
        <hr />
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Telefono</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              v-for="usuario in usuarios"
              :key="usuario"
              :class="{ hover: true, active: selectedRow === usuario }"
              @click="handleRowClick(usuario)"
            >
              <th>{{ usuario.id }}</th>
              <td>{{ usuario.nombre }}</td>
              <td>{{ usuario.apellido }}</td>
              <td>{{ usuario.DNI }}</td>
              <td>{{ usuario.telefono }}</td>
              <td>{{ usuario.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Form -->
    <div
      class="w-[650px] h-[900px] ml-[170px] rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col space-y-1.5 p-4">
        <p class="text-sm font-semibold text-muted-foreground">Informacion Personal</p>
      </div>
      <hr />
      <form @submit.prevent="addUsuario()">
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <TextBox v-model="nombre" :text="`Nombre`" placeholder="" type="text"></TextBox>
            </div>
            <div class="space-y-2">
              <TextBox v-model="apellido" :text="`Apellido`" placeholder="" type="text"></TextBox>
            </div>
          </div>
          <div class="space-y-2">
            <TextBox v-model="correo" :text="`Correo`" type="text"></TextBox>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <TextBox v-model="dni" :text="`DNI`" placeholder="" type="number"></TextBox>
            </div>
            <div class="space-y-2">
              <TextBox v-model="telefono" :text="`Telefono`" placeholder="" type="number"></TextBox>
            </div>
          </div>
          <div class="space-y-2">
            <label class="pe-4 text-sm font-semibold">rol</label>
            <select id="mySelect" v-model="rol" class="select select-bordered w-full flex">
              <option disabled selected>seleccione una opccion</option>
              <option value="6">Administrador</option>
              <option value="3">Cajero</option>
              <option value="1">Vendedor</option>
            </select>
          </div>
          <!-- <a>{{ rol }}</a> -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <TextBox v-model="username" :text="`UserName`" placeholder="" type="text"></TextBox>
            </div>
            <div class="space-y-2">
              <TextBox v-model="password" :text="`Password`" placeholder="" type="text"></TextBox>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <a></a>
            <div class="space-y-2">
              <label class="label cursor-pointer">
                <span for="checkbox" class="label-text">inhabilitado: {{ inhabilitado }}</span>
                <input id="checkbox" v-model="inhabilitado" type="checkbox" class="checkbox" />
              </label>
            </div>
          </div>
        </div>
        <div class="items-center p-6 flex justify-between">
          <button v-if="btnAgregar" class="btn btn-neutral" type="submit">Agregar</button>
          <button v-if="btnActualizar" class="btn btn-accent" type="button" @click="updateUser()">
            Actualizar
          </button>
          <button
            v-if="btnActualizar"
            class="btn btn-outline btn-error"
            type="button"
            onclick="my_modal_1.showModal()"
          >
            Eliminar
          </button>
          <button v-if="btnActualizar" class="btn btn-neutral" type="button" @click="resetPage()">
            Cambiar
          </button>
        </div>
      </form>
    </div>
    <!-- <a>{{ inventario }}</a> -->
  </div>
</template>
