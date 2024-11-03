<template>
  <div class="header-container">
    <div class="header">
      <div class="logo-container">
        <router-link to="/"><img src="@/assets/Logo.svg" /></router-link>
      </div>
      <div class="header-menu">
        <span class="menu-text">Home</span>
        <span class="menu-text">Events</span>
        <span class="menu-text">About</span>
        <span class="menu-text">Contact</span>
      </div>
      <div class="user-menu">
        <router-link to="/EventForm" class="menu-text" v-if="isAuthentificated">
          <span class="menu-text">Create Event</span>
        </router-link>
        <router-link to="/LogIn" class="menu-text" v-else>
          <span>Login</span>
        </router-link>
        <span class="menu-text" @click="logout()" v-if="isAuthentificated">
          {{ userProfile.name }}
        </span>
        <router-link to="/SignUp" v-else>
          <button class="menu-sign-up">Sign Up</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile"]),
    ...mapState(["isAuthentificated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {});
    },
  },
};
</script>
