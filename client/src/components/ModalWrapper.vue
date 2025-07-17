<script setup>

  defineProps({
    modalId: { type: String, required: true, },
    modalHeader: { type: String, required: true, },
  });

</script>
<template>
  <div class="modal fade bg-primary text-secondary" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fancy-font" :id="`${modalId}Label`">
            {{ modalHeader }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>