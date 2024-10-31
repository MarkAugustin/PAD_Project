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
    <div class="card-btn-area">
      <button class="card-edit" @click="editEvent()">EDIT</button>
      <button class="card-delete" @click="deleteEvent()">DELETE</button>
    </div>
  </div>
</template>

<script>
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

<style>
.card-container {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.card-desc {
  display: flex;
  justify-content: flex-start;
  width: 400px;
}
.card-date-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 20px;
}
.card-event-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-name {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  text-align: start;
}
.card-location {
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  font-size: 15px;
  width: 100%;
  text-align: start;
}
.card-event-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}
.card-time {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 17px;
}
.card-price {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 18px;
}
.card-name,
.card-location {
  display: inline-block;
  width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-btn-area {
  display: flex;
  width: 400px;
  justify-content: space-around;
}
.card-delete {
  width: 48%;
  color: white;
  background-color: #2b293d;
  border-color: #2b293d;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}
.card-edit {
  width: 48%;
  color: #2b293d;
  background-color: white;
  border-color: #2b293d;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}
</style>
