<template lang="">
  <div
    class="w-[1300px] h-[800px] ml-[250px] rounded-lg border bg-card text-card-foreground shadow-sm"
  >
    <div class="flex w-full h-[70px] justify-evenly items-center">
      <h2 class="font-bold">Filtrar por:</h2>
      <div class="join ml-[500px]">
        <input
          class="join-item btn btn-square w-20"
          type="radio"
          name="options"
          aria-label="Todos"
          checked="checked"
          @click="getAllBitacora()"
        />
        <input
          class="join-item btn btn-square w-20"
          type="radio"
          name="options"
          aria-label="Hoy"
          @click="getTodayBitacora()"
        />
      </div>
    </div>
    <hr />
    <div class="block overflow-x-auto w-full h-[700px]">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>usuario</th>
            <th>Accion</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <!-- row  -->
          <tr v-for="log in bitacora" :key="log">
            <th>{{ log.id_usuario }}</th>
            <td>{{ log.usuario }}</td>
            <td>{{ log.accion }}</td>
            <td>{{ log.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import usefetch from '../../composable/fectchData'

const bitacora = ref(null)

onMounted(() => {
  getAllBitacora()
})

const getAllBitacora = async () => {
  const result = await usefetch(`/bitacora/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  bitacora.value = result.value
}

const getTodayBitacora = async () => {
  const result = await usefetch(`/bitacora/today`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  bitacora.value = result.value
}
</script>
