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
        <form class="signup-form">
          <label for="signup-name" class="signup-label">Full Name</label>
          <input
            id="signup-name"
            placeholder="Enter your full name"
            class="signup-input"
            required
          />
          <label for="signup-email" class="signup-label">Email Address</label>
          <input
            id="signup-email"
            placeholder="Enter your e-mail"
            class="signup-input"
            required
          />
          <label for="signup-pass" class="signup-label">Password</label>
          <input
            id="signup-pass"
            placeholder="Enter password"
            class="signup-input"
            type="password"
            required
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

