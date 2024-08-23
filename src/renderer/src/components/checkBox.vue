<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text text-base">{{ props.text }}</span>
      <input v-model="model" type="checkbox" class="checkbox" />
    </label>
  </div>
</template>
<script setup>
const model = defineModel()
const props = defineProps({
  text: String
})
</script>
