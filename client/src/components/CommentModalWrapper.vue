<script setup>

defineProps({
  modalId: { type: String, required: true, },
  modalHeader: { type: String, required: true, },
});

</script>
<template>
  <div class="modal fade  text-secondary" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-primary">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fancy-font" :id="`${modalId}Label`">
            {{ modalHeader }}
          </h1>
          <button type="button" class="btn position-absolute" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close fs-1 text-warning"></i>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

  .modal {
    position: fixed;
    left: 50%;
    top: 42.5%;
    transform: translateX(-50%);
    height: 60%;
    overflow-y:scroll;
    width: 100%;

  }

  .modal-header {
    position: sticky;
    top: 0;
    background-color: var(--bs-primary);
    z-index: 10000;
  }

  .position-absolute {
    right: 0;
  }

</style>