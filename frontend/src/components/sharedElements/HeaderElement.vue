<template>
  <div class="header-container">
    <div class="header">
      <div class="logo-container">
        <img src="@/assets/Logo.svg" />
      </div>
      <div class="header-menu">
        <span class="menu-text">Home</span>
        <span class="menu-text">Events</span>
        <span class="menu-text">About</span>
        <span class="menu-text">Contact</span>
      </div>
      <div class="user-menu">
        <span class="menu-text">Login</span>
        <button class="menu-sign-up">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style>
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b293d;
}
.header {
  width: 1920px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header-menu {
  display: flex;
  width: 492px;
  justify-content: space-around;
  align-items: center;
}
.menu-text {
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-weight: 300; /* SemiBold */
  font-size: 24px;
}
.menu-selected {
  font-weight: 600;
}
.user-menu {
  width: 260px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu-sign-up {
  width: 137px;
  height: 50px;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300; /* SemiBold */
  font-size: 24px;
  background-color: #ffe047;
  border-color: #00000000;
}
</style>
