<template>
  <dialog id="my_modal_5" class="modal alert-warning modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Alerta!</h3>
      <slot name="text" class="py-4"></slot>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Cerrar</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup></script>
