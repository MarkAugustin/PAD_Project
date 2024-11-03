<template>
  <div class="login-page">
    <div class="login-container">
      <div style="display: flex; flex-direction: column; padding-left: 5%">
        <span class="login-slogan"> Discover tailored events.</span>
        <span class="login-slogan">
          Log in for personalized recommendations today!
        </span>
      </div>
      <div class="login-area">
        <span class="login-head"> Login </span>
        <div class="login-buttons">
          <button class="login-service">
            <img
              src="@/assets/Google.svg"
              style="width: 25px; margin-right: 5px"
            />
            Log in with Google
          </button>
          <button class="login-service">
            <img
              src="@/assets/Facebook.svg"
              style="width: 25px; margin-right: 5px"
            />
            Log in with Facebook
          </button>
        </div>
        <form class="login-form" @submit.prevent="login()">
          <label for="login-email" class="login-label">Email Address</label>
          <input
            id="login-email"
            placeholder="Enter your e-mail"
            class="login-input"
            required
            v-model="this.email"
          />
          <label for="login-pass" class="login-label">Password</label>
          <input
            id="login-pass"
            placeholder="Enter password"
            class="login-input"
            type="password"
            required
            v-model="this.password"
          />
          <input type="submit" value="Login" class="login-submit" />
        </form>
        <span class="login-signup">
          Don't have an account?
          <router-link to="/SignUp"> Sign Up</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        alert("Авторизация прошла успешно!");
        this.$router.push("/");
      } catch (error) {
        alert("Something wrong!");
      }
    },
  },
};
</script>
