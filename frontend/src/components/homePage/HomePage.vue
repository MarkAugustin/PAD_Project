<template>
  <div class="home-page-container">
    <banner-element></banner-element>
    <categories-element></categories-element>
    <catalogue-element></catalogue-element>
  </div>
</template>

<script>
import BannerElement from "./components/BannerElement.vue";
import CatalogueElement from "./components/CatalogueElement.vue";
import CategoriesElement from "./components/CategoriesElement.vue";

export default {
  components: {
    BannerElement,
    CatalogueElement,
    CategoriesElement,
  },
};
</script>
