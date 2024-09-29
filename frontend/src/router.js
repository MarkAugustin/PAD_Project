import { createRouter, createWebHistory } from "vue-router";

import SignUpPage from "./components/authPage/SignUpPage.vue";
import HomePage from "./components/homePage/HomePage.vue";
import EventCRUDPage from "./components/eventCRUDPage/EventCRUDPage.vue";

const routes = [
  {
    path: "/SignUp",
    component: SignUpPage,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/EventForm",
    component: EventCRUDPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
