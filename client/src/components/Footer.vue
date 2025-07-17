<script setup>

</script>


<template>
  <section class="container-fluid fixed-bottom">
    <div class="row footer-wrapper">
      <div class="col-3">
        <RouterLink :to="{ name: 'Account' }">
          <i class=" mdi mdi-account footer-icon text-success"></i>
        </RouterLink>
      </div>
      <div class="col-3">
        <RouterLink :to="{ name: 'Home' }">
          <i class=" mdi mdi-home footer-icon text-danger"></i>
        </RouterLink>
      </div>
      <div class="col-3">
        <!--ADD CREATE IMAGE MODAL HERE-->
          <i class="col-3 mdi mdi-image footer-icon text-warning" role="button" data-bs-toggle="modal" data-bs-target="#photoUploadForm"></i>

      </div>
      <div class="col-3">
        <!--ADD SEARCH ROUTER LINK HERE-->
          <i class="col-3 mdi mdi-magnify footer-icon text-info"></i>

      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>

a {
  text-decoration: none;
}

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