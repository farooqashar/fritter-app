<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <particles-bg
      type="fountain"
      bg="true"
    />
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <router-link to="/">
        Home
        <font-awesome-icon icon="fa-solid fa-house" />
      </router-link>
      <router-link 
        v-if="$store.state.username"
        to="/halloffame"
      >
        Hall of Fame
        <font-awesome-icon icon="fa-solid fa-star" />
      </router-link>
      <router-link 
        to="/games"
      >
        Games
        <font-awesome-icon icon="fa-solid fa-gamepad" />
      </router-link>
      <section v-if="$store.state.username">
        <router-link
          to="/account"
        >
          Account
          <font-awesome-icon icon="fa-solid fa-user" />
        </router-link>
      </section>
      <section v-else>
        <router-link
          to="/login"
        >
          Login
        </router-link>
      </section>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";

export default {
  components: {ParticlesBg},
}
</script>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #0096FF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
