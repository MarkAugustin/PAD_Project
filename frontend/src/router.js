import { createRouter, createWebHistory } from "vue-router";

import SignUpPage from "./components/authPage/SignUpPage.vue";
import HomePage from "./components/homePage/HomePage.vue"

const routes = [
  {
    path: "/SignUp",
    component: SignUpPage,
  },
  {
    path: "/",
    component: HomePage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
