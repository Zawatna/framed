<script setup>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="text-center">
    <Footer />
  </footer>
</template>

<style lang="scss">
main {
  margin-bottom: 5rem;
}
</style>
