<template>
  <div class="">
    <!-- <slot name="text" class="pe-4"></slot> -->
    <label for="input" class="pe-4 text-sm font-semibold">{{ props.text }}</label>
    <input
      v-model="model"
      :type="props.type"
      class="input input-bordered input-lg flex w-full h-12"
      :placeholder="props.placeholder"
      :value="props.value"
    />
  </div>
</template>
<script setup>
const model = defineModel(String)
const props = defineProps({
  text: String,
  placeholder: String,
  type: String,
  value: String
})
</script>
