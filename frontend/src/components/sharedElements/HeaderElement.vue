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
        <img
          src="@/assets/Notify-no.svg"
          width="35"
          v-on:click="toggleSubscription()"
          v-if="isAuthentificated && !notify"
        />
        <img
          src="@/assets/Notify-yes.svg"
          width="35"
          v-on:click="toggleSubscription()"
          v-if="isAuthentificated && notify"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { toggleSubscription } from "../../../services/notifyService";
export default {
  computed: {
    ...mapState(["userProfile"]),
    ...mapState(["isAuthentificated"]),
    ...mapState(["notify"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {});
    },
    async toggleSubscription() {
      const response = await toggleSubscription(this.userProfile.email);
      this.$store.dispatch(
        "toggleUserSubscription",
        !this.$store.state.userProfile.isSubscribed
      );
      alert(response);
    },
  },
};
</script>
