<template>
  <div class="crud-container">
    <form class="crud-form" @submit.prevent="submitForm">
      <span class="crud-head">Create/Edit an Event</span>
      <span class="crud-theme">Event Details</span>
      <div class="crud-block">
        <span class="crud-name">
          Event Title
          <span style="color: red">*</span>
        </span>
        <input
          v-model="eventInfo.eventName"
          class="crud-input"
          placeholder="Enter the name of your event"
          required
        />
      </div>
      <div class="crud-block">
        <span class="crud-name">
          Event Category
          <span style="color: red">*</span>
        </span>
        <select v-model="eventInfo.eventCategory" class="crud-select" required>
          <option value="a" selected disabled>-- Please select one --</option>
          <option value="b">ф</option>
          <option value="c">а</option>
        </select>
      </div>
      <span class="crud-theme">Date & Time</span>
      <div class="crud-block">
        <span class="crud-name">
          Event Type
          <span style="color: red">*</span>
        </span>
        <div>
          <input
            v-model="eventInfo.eventType"
            name="type"
            type="radio"
            id="single"
            value="Single Event"
            required
          />
          <label class="crud-radio" for="single">Single Event</label>
        </div>
        <div>
          <input
            v-model="eventInfo.eventType"
            name="type"
            type="radio"
            id="multi"
            value="Recurring Event"
            required
          />
          <label class="crud-radio" for="multi">Recurring Event</label>
        </div>
      </div>
      <div class="crud-block">
        <span class="crud-name">
          Session(s)
          <span style="color: red">*</span>
        </span>
        <div class="crud-data">
          <label class="crud-data-head" for="single">
            Date
            <span style="color: red">*</span>
          </label>
          <input
            v-model="eventInfo.eventDate"
            type="date"
            id="date"
            ref="date"
            :min="getToday()"
            @input="checkDateValidity()"
            required
          />
        </div>
        <div class="crud-data">
          <label class="crud-data-head" for="time-start">
            Start Time
            <span style="color: red">*</span>
          </label>
          <input
            v-model="eventInfo.eventTimeStart"
            type="time"
            id="time-start"
            required
          />
        </div>
        <div class="crud-data">
          <label class="crud-data-head" for="time-finish">
            End Time
            <span style="color: red">*</span>
          </label>
          <input
            v-model="eventInfo.eventTimeFinish"
            type="time"
            id="time-finish"
            @input="checkTimeValidity"
            required
          />
        </div>
      </div>
      <span class="crud-theme">Location</span>
      <div class="crud-block">
        <span class="crud-name">
          Where will your event take place?
          <span style="color: red">*</span>
        </span>
        <input
          v-model="eventInfo.eventPlace"
          class="crud-input"
          placeholder="Choose a cool one!"
          required
        />
      </div>
      <span class="crud-theme">Upload Image</span>
      <div class="crud-block">
        <span class="crud-name">
          Event Banner
          <span style="color: red">*</span>
        </span>
        <input
          @change="handleFileUpload"
          class="crud-input"
          type="file"
          accept="image/*"
          required
          ref="fileInput"
        />
      </div>
      <span class="crud-theme">Additional Information</span>
      <div class="crud-block">
        <span class="crud-name">
          Event Description
          <span style="color: red">*</span>
        </span>
        <textarea
          v-model="eventInfo.eventDescription"
          id="textarea"
          class="crud-input"
          placeholder="Describe what's special about your event & other important details."
          required
        >
        </textarea>
      </div>
      <input type="submit" value="Save & Publish" class="crud-submit" />
    </form>
  </div>
</template>

<script>
import { createEvent } from "../../../services/eventService";
export default {
  data() {
    return {
      eventInfo: {
        eventName: "",
        eventCategory: "",
        eventDate: null,
        eventType: "",
        eventTimeStart: null,
        eventTimeFinish: null,
        eventPlace: "",
        eventBanner: null,
        eventDescription: "",
      },
    };
  },
  methods: {
    checkTimeValidity() {
      const startTime = new Date(`1970-01-01T${this.eventInfo.eventTimeStart}`);
      const endTime = new Date(`1970-01-01T${this.eventInfo.eventTimeFinish}`);
      if (startTime >= endTime) {
        this.eventInfo.eventTimeFinish = this.eventInfo.eventTimeStart;
      }
    },
    checkDateValidity() {
      const today = new Date();
      const selectedDate = new Date(this.eventInfo.eventDate);
      if (selectedDate < today) {
        this.eventInfo.eventDate = today.toISOString().split("T")[0];
      }
    },
    getToday() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
    },
    handleFileUpload(event) {
      const file = event.target.files[0]; // Получаем первый выбранный файл
      if (file) {
        this.eventInfo.eventBanner = file; // Сохраняем файл в объект
      }
    },
    async submitForm() {
      const NewEvent = this.eventInfo;
      await createEvent(NewEvent);
      this.eventInfo.eventName = "";
      this.eventInfo.eventCategory = "";
      this.eventInfo.eventDate = null;
      this.eventInfo.eventType = null;
      this.eventInfo.eventTimeStart = null;
      this.eventInfo.eventTimeFinish = null;
      this.eventInfo.eventPlace = "";
      this.eventInfo.eventBanner = null;
      this.eventInfo.eventDescription = "";
      const fileInput = this.$refs.fileInput;
      if (fileInput) {
        fileInput.value = "";
      }
    },
  },
};
</script>

<style>
.crud-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.crud-form {
  width: 1920px;
  padding: 60px 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.crud-head {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 30px;
  color: #2d2c3c;
}
.crud-theme {
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  font-size: 25px;
  margin: 50px 0px 25px 185px;
}
.crud-block {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.crud-name {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 165px;
  padding: 10px;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
}
.crud-input {
  border-color: rgba(130, 130, 130, 0.7);
  border-radius: 6px;
  width: 792px;
  height: 38px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  padding: 0px 15px;
  font-size: 18px;
}
.crud-input::placeholder {
  color: rgba(130, 130, 130, 0.7);
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  font-size: 18px;
}
.crud-select {
  border-color: rgba(130, 130, 130, 0.7);
  border-radius: 6px;
  width: 825px;
  height: 38px;
  font-family: "Montserrat", sans-serif;
  padding: 0px 11px;
  font-weight: 300;
  font-size: 18px;
}
.crud-radio {
  font-size: 18px;
  color: #2d2c3c;
  font-family: "Montserrat", sans-serif;
  margin-right: 40px;
  margin-left: 5px;
}
.crud-data {
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-around;
  align-items: flex-start;
  margin-left: 10px;
  margin-right: 15px;
}
.crud-submit {
  width: 220px;
  height: 50px;
  align-self: center;
  margin-top: 30px;
  background-color: #2b293d;
  border-radius: 10px;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}
#date,
#time-start,
#time-finish {
  width: 242px;
  height: 38px;
  border-radius: 6px;
  border-color: rgba(130, 130, 130, 0.7);
  font-size: 20px;
  color: rgba(130, 130, 130, 0.7);
  padding-left: 10px;
}
#textarea {
  resize: none;
  padding: 7px 15px;
  height: 105px;
}
</style>
