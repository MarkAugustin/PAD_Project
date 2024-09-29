<template>
  <div class="catalogue-container">
    <span class="catalogue-head"> Popular Events </span>
    <div class="catalogue-grid">
      <b-row class="grid-row">
        <b-col cols="3" v-for="event in events" :key="event.id">
          <event-card></event-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCardElement.vue";
export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [
        {
          id: 1,
          name: "Camping",
          date: "02.10.24",
        },
        {
          id: 2,
          name: "Camping",
          date: "02.10.24",
        },
        {
          id: 3,
          name: "Camping",
          date: "02.10.24",
        },
      ],
    };
  },
};
</script>

<style>
.catalogue-container {
  padding: 10px 45px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.catalogue-head {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 30px;
}
.catalogue-grid {
  width: 100%;
}
.grid-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}
</style>
