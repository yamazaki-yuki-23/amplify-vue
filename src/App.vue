<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <nav class="nav">
        <ul class="list">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/chat">Chat</router-link></li>
        </ul>
      </nav>
      <button class="contact">Sign out</button>
    </header>
    <section>
      <RouterView />
    </section>
  </main>
</template>

<style>
@import '@/assets/base.css';
</style>
