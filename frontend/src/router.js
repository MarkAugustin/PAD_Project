import { createRouter, createWebHistory } from "vue-router";

import SignUpPage from "./components/authPage/SignUpPage.vue";
import HomePage from "./components/homePage/HomePage.vue";
import EventCRUDPage from "./components/eventCRUDPage/EventCRUDPage.vue";
import LogInPage from "./components/authPage/LogInPage.vue";

const routes = [
  {
    path: "/SignUp",
    component: SignUpPage,
  },
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/EventForm/:id?",
    name: "EventForm",
    component: EventCRUDPage,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUpPage,
  },
  {
    path: "/LogIn",
    name: "LogIn",
    component: LogInPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
