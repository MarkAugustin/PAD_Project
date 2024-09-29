<template>
  <div class="categories-container">
    <span class="categories-head">Explore Categories</span>
    <div class="categories-categories">
      <div class="categories-category">
        <img src="@/assets/Cat-1.svg" />
        <span class="category-name">Entertainment</span>
      </div>
      <div class="categories-category">
        <img src="@/assets/Cat-2.svg" />
        <span class="category-name">Educational & Business</span>
      </div>
      <div class="categories-category">
        <img src="@/assets/Cat-3.svg" />
        <span class="category-name">Cultural & Arts</span>
      </div>
      <div class="categories-category">
        <img src="@/assets/Cat-4.svg" />
        <span class="category-name">Sports & Fitness</span>
      </div>
      <div class="categories-category">
        <img src="@/assets/Cat-5.svg" />
        <span class="category-name">Technology & Innovation</span>
      </div>
      <div class="categories-category">
        <img src="@/assets/Cat-6.svg" />
        <span class="category-name">Travel & Adventure</span>
      </div>
    </div>
    <div>
      <h1>Create Event</h1>
      <form @submit.prevent="createNewEvent">
        <input v-model="eventName" placeholder="Event Name" />
        <input v-model="eventDate" type="date" />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>


<script>
import { createEvent } from "../../../../services/eventService";

export default {
  data() {
    return {
      eventName: "",
      eventDate: "",
    };
  },
  methods: {
    async createNewEvent() {
      const newEvent = {
        name: this.eventName,
        date: this.eventDate,
      };
      await createEvent(newEvent);
      this.eventName = "";
      this.eventDate = "";
    },
  },
};
</script>


<style>
.categories-container {
  width: 94%;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.categories-head {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 30px;
}
.categories-categories {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.categories-category {
  width: 235px;
  height: 235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.category-name {
  color: #2d2c3c;
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: 300; /* SemiBold */
}
</style>
