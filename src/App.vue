<script setup lang="ts">
import { RouterView } from 'vue-router'
import footerCompoment from "@/components/footerCompoment.vue";
import HeaderCompoment from './components/HeaderCompoment.vue';


</script>

<template>
  <header>

  </header>
<HeaderCompoment></HeaderCompoment>
  <RouterView />
     <footerCompoment></footerCompoment>


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100%;
}

.logo {
  display: block;
  margin: 100rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: 0rem;
    font-size: 1rem;

    padding: 0rem ;
    margin-top: 0rem;
  }
}
</style>
