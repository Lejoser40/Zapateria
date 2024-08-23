<template>
  <div>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-[600px] max-w-xl">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Ventas</h3>
        <p class="text-sm text-muted-foreground">
          Concreta compras con efectivo, dolares o tarjeta
        </p>
      </div>
      <form @submit.prevent="cobrar">
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <TextBox
              :text="`Total`"
              placeholder="$0000"
              type="number"
              readonly
              :value="total"
            ></TextBox>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <TextInput
                v-model="dolares"
                :text="`Dolares`"
                placeholder="$0000"
                type="number"
                req
              ></TextInput>
            </div>
            <div class="space-y-2">
              <TextInput
                v-model="tarjeta"
                :text="`Tarjeta`"
                placeholder="₡0000"
                type="number"
              ></TextInput>
            </div>
          </div>
          <div class="space-y-2">
            <TextInput
              v-model="colones"
              :text="`Colones`"
              placeholder="₡0000"
              type="number"
            ></TextInput>
          </div>
          <div class="space-y-2">
            <label class="pe-4 text-sm font-semibold">facturas</label>
            <select v-model="sel" class="select select-bordered w-full flex" @change="handleChange">
              <option disabled selected>seleccione una factura</option>
              <option v-for="factura in facturas" :key="factura" :value="factura">
                {{ factura.cliente }}
              </option>
            </select>
            <!-- <Select
            id="comboBox1"
            v-model="sel"
            :opciones="facturas"
            :text="'Facturas'"
            :placeholder="'seleccione una factura'"
          ></Select> -->
          </div>
          <div class="space-y-2">
            <TextBox
              :text="`Vuelto`"
              placeholder="$0000"
              type="number"
              readonly
              :value="vuelto"
            ></TextBox>
          </div>
          <!-- <a>{{ sel }}</a>
          <a>{{ dolares }}</a>
          <a>{{ tarjeta }}</a>
          <a>{{ colones }}</a> -->
        </div>
        <div class="items-center p-6 flex justify-between">
          <button class="btn btn-neutral" type="submit">Pagar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import TextBox from '../../components/ventas/textBox.vue'
import TextInput from '../../components/ventas/textInput.vue'
import usefetch from '../../composable/fectchData'
import { toast } from 'vue-sonner'
// import Select from '../../components/ventas/select.vue'

const facturas = ref([])
const sel = ref({})

let total = ref(Float32Array)
let vuelto = ref(Float32Array)
let dolares = ref()
let tarjeta = ref()
let colones = ref()

onMounted(() => {
  cargarFacturas()
})

async function cobrar() {
  const js = JSON.stringify(getBody())

  const result = await usefetch('/facturacion', {
    method: 'PUT',
    body: js,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  vuelto.value = result.value.vuelto
  toast.info('Factura cancelada con exito', {
    description: `vuelto: ${vuelto.value}`
  })
  console.log(result)

  total.value = 0
}

const handleChange = () => {
  console.log('hola')
  total.value = sel.value.total
  resetTextInputs()
}

function getBody() {
  const body = {
    id: sel.value.id,
    total: total.value,
    colones: colones.value,
    dolares: dolares.value,
    tarjeta: tarjeta.value
  }
  return body
}

function resetTextInputs() {
  dolares.value = ''
  tarjeta.value = ''
  colones.value = ''
}

async function cargarFacturas() {
  const result = await usefetch('/facturacion', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  facturas.value = result.value
}
</script>
