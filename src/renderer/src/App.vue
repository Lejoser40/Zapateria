<script setup>
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div class="flex h-screen w-screen justify-center items-center">
    <div>
      <router-view></router-view>
      <Toaster richColors />
    </div>
  </div>
</template>
