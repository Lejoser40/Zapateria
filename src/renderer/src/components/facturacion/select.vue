<template>
  <div class="">
    <label class="pe-4 text-sm font-semibold">{{ props.text }}</label>
    <select v-model="model" class="select select-bordered w-full flex">
      <option disabled selected>{{ props.placeholder }}</option>
      <option v-for="opcion in props.opciones" :key="opcion" :value="opcion.value">
        {{ opcion.producto }}
      </option>
    </select>
  </div>
</template>
<script setup>
const model = defineModel(Object)
const props = defineProps({
  text: String,
  placeholder: String,
  opciones: Object
})
</script>
