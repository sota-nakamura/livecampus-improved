<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <RouterLink to="/login">Login</RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>