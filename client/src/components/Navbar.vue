<script setup>

import Login from './Login.vue';


</script>

<template>
  <nav class="navbar navbar-expand-md bg-primary border-bottom border-vue">
    <div class="container gap-2">
      <RouterLink :to="{ name: 'Home' }" class="d-flex align-items-center text-light">
        <img class="navbar-brand" alt="logo" src="../assets/img/framed-logo.png" height="45" />
        <b class="fs-2 framed-font text-warning">ramed</b>
      </RouterLink>
      <!-- collapse button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-links"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mdi mdi-menu text-light"></span>
      </button>
      <!-- collapsing menu -->
      <div class="collapse navbar-collapse " id="navbar-links">
        <ul class="navbar-nav">
          <li>
            <RouterLink :to="{ name: 'About' }" class="btn text-green selectable">
              About
            </RouterLink>
          </li>
        </ul>
        <!-- LOGIN COMPONENT HERE -->
        <div class="ms-auto">
        </div>
        <Login />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
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
