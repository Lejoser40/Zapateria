<template>
  <div>
    <div
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-[700px] max-w-4xl"
      data-v0-t="card"
    >
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Crear factura
        </h3>
        <p class="text-sm text-muted-foreground">llenar formulario para crear factura.</p>
      </div>
      <div class="p-6">
        <div class="grid gap-6">
          <div class="space-y-2">
            <div class="col-span-3 sm:col-span-1 space-y-2">
              <TextBox
                v-model="cliente"
                :text="`Cliente`"
                placeholder="nombre del cliente"
                type="text"
              ></TextBox>
            </div>
          </div>
          <div class="grid gap-4">
            <div class="relative w-full overflow-auto h-[300px]">
              <table class="w-full caption-bottom text-sm">
                <thead class="[&amp;_tr]:border-b">
                  <tr
                    class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <th
                      class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                    >
                      Producto
                    </th>
                    <th
                      class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                    >
                      Cantidad
                    </th>
                    <th
                      class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                    >
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody class="[&amp;_tr:last-child]:border-0">
                  <tr
                    v-for="zapato in zapatos"
                    :key="zapato"
                    class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <input
                        type="text"
                        :value="zapato.zapato"
                        class="input input-bordered input-md w-full h-10"
                        readonly
                      />
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <input
                        class="input input-bordered input-md w-full h-10"
                        type="number"
                        :value="zapato.cantidad"
                        min="1"
                        readonly
                        @input="zapatos[zapato].cantidad = 1"
                      />
                    </td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <input
                        class="input input-bordered input-md w-full h-10"
                        type="number"
                        :value="zapato.precio"
                        min="1"
                        readonly
                      />
                    </td>
                    <!-- <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">$49.99</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="">
              <label class="pe-4 text-sm font-semibold">Zapatos</label>
              <select id="mySelect" class="select select-bordered w-full flex">
                <option disabled selected>seleccione una opccion</option>
                <option v-for="teni in tenis" :key="teni" :value="teni.producto">
                  {{ teni.producto }}
                </option>
              </select>
            </div>
            <div class="flex justify-end gap-2">
              <button class="btn btn-active btn-primary" @click="agregarFactura()">Agregar</button>
            </div>
          </div>
          <div class="grid gap-4">
            <div class="flex justify-end gap-2">
              <div class="flex items-center gap-2">
                <span class="font-medium">Dolar:</span>
                <span>${{ cambio_dolar }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-medium">Iva:</span>
                <span>%{{ iva }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-medium">Total:</span>
                <span class="text-2xl font-bold">₡ {{ total }}</span>
              </div>
            </div>
          </div>
          <!-- <a>hola:{{ zapatos[1].cantidad }}</a> -->
        </div>
      </div>
      <div class="items-center p-6 flex justify-between">
        <div class="flex gap-2">
          <button class="btn btn-neutral" @click="createFactura()">Crear factura</button>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="createFactura()">nueva factura</button>
        </div>
      </div>
      <a>{{ cliente }}</a>
      <!-- <a>{{ tenis }}</a>
      <a>{{ zapatos }}</a> -->
    </div>
  </div>
</template>
<script setup>
import TextBox from '../../components/facturacion/textBox.vue'
// import Select from '../../components/facturacion/select.vue'
import { onMounted, ref } from 'vue'
import usefetch from '../../composable/fectchData'
import { toast } from 'vue-sonner'

// total,iva , cambio a dolar
let total = ref(0)
let iva = ref(0)
let cambio_dolar = ref(0)

// zapatos disponible en la base de datos
let tenis = ref([])
// zapatos agregados a la tabla(factura)
let zapatos = ref([])
// nombre del cliente para la factura
let cliente = ref('')

onMounted(() => {
  getZapatos()
  getContabilidad()
})

// function cookiePrueba() {
//   document.cookie = 'testCookie=Hello; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/'
// }

function agregarFactura() {
  const select = document.getElementById('mySelect').selectedIndex
  const zapato = tenis.value[select - 1]
  // console.log(zapato)
  const calcIva = (zapato.precio / 100) * iva.value
  zapatos.value.push({
    id: zapato.id,
    zapato: zapato.producto,
    cantidad: 1,
    precio: zapato.precio + calcIva
  })
  total.value += zapato.precio + calcIva
  // console.log(total.value)
}

// function agregarFactura() {
//   let tenisBuscado = tenis.value.find((tenis) => tenis.producto == `${select.value}`)
//   const zapato = { text: tenisBuscado.producto, cantidad: 1, precio: tenisBuscado.precio }
//   zapatos.value.push(zapato)
// }

async function createFactura() {
  const aaa = Array.from(zapatos.value)
  const jsData = { cliente: cliente.value, zapatos: aaa }
  const result = await usefetch('/facturacion/', {
    method: 'POST',
    body: JSON.stringify(jsData),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log(result.value)
  toast.message('Factura creada', {
    description: `factura nº${result.value.numerofactura}#, nombre: ${result.value.nombre}`
  })
}

async function getContabilidad() {
  const data = await usefetch('/contabilidad', {
    method: 'GET'
  })
  // console.log(data.value)
  iva.value = data.value[0].iva
  cambio_dolar.value = data.value[0].cambio_dolar
}

async function getZapatos() {
  const data = await usefetch('/inventario/disponibles', {
    method: 'GET'
  })
  tenis.value = data.value
  // console.log(tenis.value)
}
</script>
