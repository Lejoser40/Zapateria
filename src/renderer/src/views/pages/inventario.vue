<script setup>
import { onMounted, ref } from 'vue'
import usefetch from '../../composable/fectchData'
import TextBox from '../../components/Iventario/textBox.vue'
import { toast } from 'vue-sonner'

let inventario = ref([])

let producto = ref('')
let descripcion = ref('')
let precio = ref('')
let stock = ref('')

const selectedRow = ref(null)
const btnAgregar = ref(true)
const btnActualizar = ref(false)

onMounted(() => {
  loadInventario()
})

const resetPage = () => {
  loadInventario()
  producto.value = ''
  descripcion.value = ''
  precio.value = ''
  stock.value = ''
  btnAgregar.value = true
  btnActualizar.value = false
}

const handleRowClick = (row) => {
  selectedRow.value = row
  btnAgregar.value = false
  btnActualizar.value = true

  producto.value = selectedRow.value.producto
  descripcion.value = selectedRow.value.descripcion
  precio.value = selectedRow.value.precio
  stock.value = selectedRow.value.stock

  console.log(selectedRow.value)
}

async function loadInventario() {
  const result = await usefetch('/inventario/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  // console.log(result.value)
  inventario.value = result.value
}

async function addInventario() {
  const js = JSON.stringify(getBody())

  const result = await usefetch('/inventario', {
    method: 'POST',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  displayToast('Zapato agregado con exito')

  loadInventario()
}

async function updateZapato() {
  const js = JSON.stringify(getBodyUpdate())

  const result = await usefetch('/inventario', {
    method: 'PUT',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  displayToast('Zapato actualizado con exito')

  loadInventario()
}

async function deleteZapato() {
  const id = selectedRow.value.id
  const result = await usefetch(`/inventario/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  displayToast('Zapato Eliminado con exito')

  loadInventario()
}

function displayToast(msg) {
  toast.info(`${msg}`)
}

function getBody() {
  const body = {
    producto: producto.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value
  }
  return body
}

function getBodyUpdate() {
  const body = {
    id: selectedRow.value.id,
    producto: producto.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value
  }
  return body
}
</script>
<template lang="">
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Alerta!</h3>
      <p class="py-4">¿Desea eliminar este producto?</p>
      <div class="modal-action">
        <form method="dialog" class="flex justify-between">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-neutral" @click="deleteZapato()">Si</button>
          &nbsp; &nbsp; &nbsp;
          <button class="btn">No</button>
        </form>
      </div>
    </div>
  </dialog>

  <div class="grid grid-cols-2 gap-4">
    <!-- Tabla -->
    <div
      class="w-[650px] h-[800px] ml-[450px] rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col space-y-1.5 p-4">
        <p class="text-sm font-semibold text-muted-foreground">Inventario</p>
      </div>
      <div class="block overflow-auto w-full h-[750px]">
        <hr />
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>id</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              v-for="zapato in inventario"
              :key="zapato"
              :class="{ hover: true, active: selectedRow === zapato }"
              @click="handleRowClick(zapato)"
            >
              <th>{{ zapato.id }}</th>
              <td>{{ zapato.producto }}</td>
              <td>{{ zapato.descripcion }}</td>
              <td>{{ zapato.precio }}</td>
              <td>{{ zapato.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Form -->
    <div
      class="w-[650px] h-[800px] ml-[170px] rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col space-y-1.5 p-4">
        <p class="text-sm font-semibold text-muted-foreground">Formulario</p>
      </div>
      <hr />
      <form @submit.prevent="addInventario()">
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <TextBox v-model="producto" :text="`Producto`" placeholder="" type="text"></TextBox>
          </div>
          <div class="space-y-2">
            <TextBox v-model="descripcion" :text="`Descripcion`" type="text"></TextBox>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <TextBox v-model="precio" :text="`Precio`" placeholder="" type="number"></TextBox>
            </div>
            <div class="space-y-2">
              <TextBox v-model="stock" :text="`Stock`" placeholder="" type="text"></TextBox>
            </div>
          </div>
        </div>
        <div class="items-center p-6 flex justify-between">
          <button v-if="btnAgregar" class="btn btn-neutral" type="submit">Agregar</button>
          <button v-if="btnActualizar" class="btn btn-accent" type="button" @click="updateZapato()">
            Actualizar
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
