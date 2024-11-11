import { createStore } from "vuex";
import { loginUser, logoutUser } from "../../services/authService";
import router from "@/router";
import { checkSubscription } from "../../services/notifyService";

const store = createStore({
  state() {
    return {
      isAuthentificated: false,
      userProfile: JSON.parse(localStorage.getItem("userProfile")) || {},
      notify: JSON.parse(localStorage.getItem("notify")) || false,
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
    toggleUserSubscription(state, isSubscribed) {
      state.userProfile.isSubscribed = isSubscribed;
      if (isSubscribed) {
        localStorage.setItem("notify", JSON.stringify(isSubscribed));
      } else {
        localStorage.removeItem("notify");
      }
    },
  },
  actions: {
    async login({ commit }, form) {
      try {
        const userInfo = await loginUser(form.email, form.password);
        const notifyInfo = await checkSubscription(userInfo.email);
        commit("setUserProfile", userInfo);
        commit("toggleUserSubscription", notifyInfo);
      } catch (error) {
        console.error("Error while loging in:", error);
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
      const notify = JSON.parse(localStorage.getItem("notify"));
      if (userProfile) {
        commit("setUserProfile", userProfile);
      }
      if (notify) {
        commit("toggleUserSubscription", notify);
      }
    },
    toggleUserSubscription({ commit }, isSubscribed) {
      commit("toggleUserSubscription", isSubscribed);
    },
  },
});

store.dispatch("initializeAuth");

export default store;
