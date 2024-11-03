<template>
  <div class="card-container">
    <img :src="eventImage" style="width: 400px; height: 250px" />

    <div class="card-desc">
      <div class="card-date-info">
        <span>{{ month }}</span>
        <span>{{ day }}</span>
      </div>
      <div class="card-event-header">
        <span class="card-name">{{ eventName }}</span>
        <span class="card-location"> {{ eventPlace }} </span>
        <div class="card-event-footer">
          <span class="card-time"
            >{{ eventTimeStart }}
            <span class="card-time" v-if="eventTimeFinish">
              - {{ eventTimeFinish }}
            </span></span
          >
          <span class="card-price">{{ eventPrice }}.00$</span>
        </div>
      </div>
    </div>
    <div class="card-btn-area" v-if="isAuthentificated">
      <button class="card-edit" @click="editEvent()">EDIT</button>
      <button class="card-delete" @click="deleteEvent()">DELETE</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    eventID: {},
    eventName: {},
    eventPlace: {},
    eventTimeStart: {},
    eventTimeFinish: {},
    eventPrice: {},
    eventDate: {},
    eventImage: {},
  },
  computed: {
    ...mapState(["isAuthentificated"]),
  },
  data() {
    return {
      day: 0,
      month: "",
    };
  },
  created() {
    if (!this.eventDate) return "";

    const date = new Date(this.eventDate);

    this.day = date.getDate();
    const monthNumber = date.getMonth();

    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    this.month = monthNames[monthNumber];
  },
  methods: {
    editEvent() {
      this.$emit("edit", this.eventID);
    },
    deleteEvent() {
      this.$emit("delete", this.eventID);
    },
  },
};
</script>
