<template>
  <div class="">
    <!-- <slot name="text" class="pe-4"></slot> -->
    <label for="input" class="pe-4 text-sm font-semibold">{{ props.text }}</label>
    <input
      v-model="model"
      :type="props.type"
      class="input input-bordered flex w-full h-10"
      :placeholder="props.placeholder"
      readonly
    />
  </div>
</template>
<script setup>
const model = defineModel(String)
const props = defineProps({
  text: String,
  placeholder: String,
  type: String
})
</script>
