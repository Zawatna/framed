<script setup></script>

<template>
  <nav class="bg-primary border-bottom border-vue">
    <div class="container-fluid d-flex justify-content-between">
      <RouterLink
        :to="{ name: 'Home' }"
        class="d-flex align-items-center text-light"
      >
        <img
          class="navbar-brand ms-4"
          alt="logo"
          src="../assets/img/framed-logo.png"
          height="45"
        />
        <b class="fs-2 framed-font text-warning ms-1 mt-4">ramed</b>
        
      </RouterLink>
            <RouterLink :to="{ name: 'About' }" class="btn text-green selectable fs-4 align-items-center d-flex">
              About
            </RouterLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

img {
  border-radius: 10%;
}

.nav-link {
  text-transform: uppercase;
}

.framed-font {
  margin-left: -10px;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
