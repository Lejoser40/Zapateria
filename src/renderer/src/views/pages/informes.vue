<template lang="">
  <div>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-xl">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Informe de flujo de dinero
        </h3>
        <p class="text-sm text-muted-foreground">
          Realice un seguimiento de sus pagos diarios en efectivo, con tarjeta y en dólares.
        </p>
      </div>
      <div class="p-6 grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <TextBox v-model="colones" :text="'Colones'"></TextBox>
          </div>
          <div class="space-y-2">
            <TextBox v-model="tarjeta" :text="'Pagos con tarjeta'"></TextBox>
          </div>
        </div>
        <div class="space-y-2">
          <TextBox v-model="dolares" :text="'Pagos en dolares'"></TextBox>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          class="shrink-0 bg-border h-[1px] w-full"
        ></div>
        <!-- <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <TextBox v-model="cierre_caja" :text="'Cierre de caja'"></TextBox>
          </div>
        </div> -->
        <div class="space-y-2">
          <TextBox v-model="flujo_caja" :text="'Flujo de caja diario'"></TextBox>
        </div>
      </div>
      <div class="flex items-center p-6">
        <button class="btn btn-neutral" type="submit">Save</button>
      </div>
    </div>
    <!-- <a>{{ colones }}</a>
    <a>{{ tarjeta }}</a>
    <a>{{ dolares }}</a> -->
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TextBox from '../../components/informes/textBox.vue'
import usefetch from '../../composable/fectchData'

let colones = ref(0)
let tarjeta = ref(0)
let dolares = ref(0)

// let cierre_caja = ref(0)
let flujo_caja = ref(0)

onMounted(() => {
  init()
})

async function init() {
  const result = await usefetch('/facturacion/informes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  console.log(result.value)

  flujo_caja.value = result.value.total
  colones.value = result.value.colones
  dolares.value = result.value.dolares
  tarjeta.value = result.value.tarjeta
}
</script>
