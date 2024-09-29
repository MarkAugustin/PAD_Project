<template>
  <div class="banner-container">
    <img class="banner-image" src="@/assets/Banner.jpg" />
    <div class="banner-text-group">
      <span class="banner-text">Don’t miss out!</span>
      <span class="banner-text">
        Explore the <span style="color: #ffe047">vibrant events</span> happening
        locally and globally.
      </span>
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
.banner-container {
  width: 100%;
  height: 578px;
  overflow: hidden;
  position: relative;
}
.banner-image {
  position: absolute;
  left: 0px;
  top: -80%;
  width: 1920px;
  object-fit: cover;
  z-index: 0;
  filter: blur(3px);
}
.banner-text-group {
  position: absolute;
  z-index: 1;
  top: 180px;
  left: 230px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.banner-text {
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 40px;
  font-weight: 600;
  margin-top: 15px;
}
</style>
