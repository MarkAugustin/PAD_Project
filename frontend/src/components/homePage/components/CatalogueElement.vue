<template>
  <div class="catalogue-container">
    <span class="catalogue-head"> Popular Events </span>
    <div class="catalogue-grid">
      <b-row class="grid-row">
        <b-col cols="4" v-for="event in events" :key="event.id">
          <event-card
            :eventID="event.id"
            :eventName="event.eventName"
            :eventPlace="event.eventPlace"
            :eventTimeStart="event.eventTimeStart"
            :eventTimeFinish="event.eventTimeFinish"
            :eventPrice="event.eventPrice"
            :eventDate="event.eventDate"
            :eventImage="event.eventImage"
            @delete="removeEvent"
            @edit="editEvent"
          ></event-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { getAllEvents, deleteEvent } from "../../../../services/eventService";
import EventCard from "./EventCardElement.vue";
export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const eventsData = await getAllEvents();
        this.events = eventsData;
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    },
    async removeEvent(id) {
      try {
        await deleteEvent(id);
        this.events = this.events.filter((event) => event.id !== id);
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    },
    async editEvent(id) {
      this.$router.push({
        name: "EventForm",
        params: { id: id },
      });
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

