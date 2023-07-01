<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <main>
        <header>
          <nav class="nav">
            <ul class="list">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/chat">Chat</router-link></li>
            </ul>
          </nav>
          <button @click="signOut" class="contact">Sign out</button>
        </header>
        <section>
          <router-view :username="user.username" />
        </section>
      </main>
    </template>
  </authenticator>
</template>

<style>
@import '@/assets/base.css';
</style>
