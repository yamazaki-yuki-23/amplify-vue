<script setup lang="ts">
defineProps({
  username: String
})
</script>

<template>
  <div class="home">
    <h1>Login User, {{ username }} !</h1>
  </div>
</template>
