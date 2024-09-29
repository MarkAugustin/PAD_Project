<template>
  <div id="#app">
    <header-element></header-element>
    <router-view></router-view>
    <footer-element></footer-element>
  </div>
</template>

<script>
import HeaderElement from "@/components/sharedElements/HeaderElement.vue";
import FooterElement from "@/components/sharedElements/FooterElement.vue";

export default {
  name: "App",
  components: {
    HeaderElement,
    FooterElement,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
