<script setup>

</script>


<template>
  <section class="container-fluid fixed-bottom">
    <div class="row footer-wrapper">
      <i class="col-3 mdi mdi-account footer-icon text-success"></i>
      <i class="col-3 mdi mdi-home footer-icon text-danger"></i>
      <i class="col-3 mdi mdi-image footer-icon text-warning">
    </i>
      <i class="col-3 mdi mdi-magnify footer-icon text-info"></i>
    </div>
  </section>
</template>


<style lang="scss" scoped>

.footer-icon {
  font-size: 60px;
  
}

.footer-wrapper {
  height: 80px;
  background: #0F0050;
  background: radial-gradient(circle,rgba(15, 0, 80, 0.53) 33%, rgba(0, 0, 0, 0.6) 100%);
  backdrop-filter: blur(5px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}



</style>