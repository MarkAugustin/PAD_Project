import { createStore } from "vuex";
import { loginUser, logoutUser } from "../../services/authService";
import router from "@/router";

const store = createStore({
  state() {
    return {
      isAuthentificated: false,
      userProfile: JSON.parse(localStorage.getItem("userProfile")) || {},
    };
  },
  mutations: {
    setUserProfile(state, val) {
      state.isAuthentificated = val && Object.keys(val).length > 0;
      state.userProfile = val;
      if (val) {
        localStorage.setItem("userProfile", JSON.stringify(val));
      } else {
        localStorage.removeItem("userProfile");
      }
    },
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        const userInfo = await loginUser(form.email, form.password);
        dispatch("fetchUserProfile", userInfo);
      } catch (error) {
        console.error("Error creating event:", error);
        throw error;
      }
    },
    async logout({ commit }) {
      await logoutUser();
      commit("setUserProfile", {});
      router.push("/");
    },
    initializeAuth({ commit }) {
      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      if (userProfile) {
        commit("setUserProfile", userProfile);
      }
    },
    async fetchUserProfile({ commit }, user) {
      commit("setUserProfile", user);
      return;
    },
  },
});

store.dispatch("initializeAuth");

export default store;
