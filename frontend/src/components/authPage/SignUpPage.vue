<template>
  <div class="signup-page">
    <div class="signup-container">
      <div style="display: flex; flex-direction: column; padding-left: 5%">
        <span class="signup-slogan"> Discover tailored events.</span>
        <span class="signup-slogan">
          Sign up for personalized recommendations today!
        </span>
      </div>
      <div class="signup-area">
        <span class="signup-head"> Create Account </span>
        <div class="signup-buttons">
          <button class="signup-service">
            <img
              src="@/assets/Google.svg"
              style="width: 25px; margin-right: 5px"
            />
            Sign up with Google
          </button>
          <button class="signup-service">
            <img
              src="@/assets/Facebook.svg"
              style="width: 25px; margin-right: 5px"
            />
            Sign up with Facebook
          </button>
        </div>
        <form class="signup-form" @submit.prevent="register()">
          <label for="signup-name" class="signup-label">Full Name</label>
          <input
            id="signup-name"
            placeholder="Enter your full name"
            class="signup-input"
            required
            v-model="this.registrationData.name"
          />
          <label for="signup-email" class="signup-label">Email Address</label>
          <input
            id="signup-email"
            placeholder="Enter your e-mail"
            class="signup-input"
            required
            v-model="this.registrationData.email"
          />
          <label for="signup-pass" class="signup-label">Password</label>
          <input
            id="signup-pass"
            placeholder="Enter password"
            class="signup-input"
            type="password"
            required
            v-model="this.registrationData.password"
          />
          <input type="submit" value="Create Account" class="signup-submit" />
        </form>
        <span class="signup-login">
          Already have an account?
          <router-link to="/LogIn"> Log in</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "../../../services/authService.js";
import router from "@/router.js";

export default {
  data() {
    return {
      registrationData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    validatePassword(password) {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    },
    async register() {
      if (
        this.registrationData.name.length < 4 ||
        this.registrationData.name.length > 12
      ) {
        alert("Wrong name format");
        return;
      }
      if (!this.validateEmail(this.registrationData.email)) {
        alert("Wrong email format");
        return;
      }
      if (!this.validatePassword(this.registrationData.password)) {
        alert(
          "The password must be at least 8 characters and contain letters and numbers"
        );
        return;
      }
      try {
        await registerUser(this.registrationData);
        alert("Регистрация прошла успешно!");
        router.push({ name: "LogIn" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
