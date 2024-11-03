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
          <option value="---" selected disabled>-- Please select one --</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Educational & Business">Educational & Business</option>
          <option value="Cultural & Arts">Cultural & Arts</option>
          <option value="Sports & Fitness">Sports & Fitness</option>
          <option value="Technology & Innovation">
            Technology & Innovation
          </option>
          <option value="Travel & Adventure">Travel & Adventure</option>
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
          <label class="crud-data-head" for="time-finish"> End Time </label>
          <input
            v-model="eventInfo.eventTimeFinish"
            type="time"
            id="time-finish"
            @input="checkTimeValidity"
          />
        </div>
      </div>
      <span class="crud-theme">Location & Price</span>
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
      <div class="crud-block">
        <span class="crud-name">
          Price ($)
          <span style="color: red">*</span>
        </span>
        <input
          v-model="eventInfo.eventPrice"
          class="crud-input"
          type="number"
          placeholder="100.00"
          style="width: 50%"
          min="0.00"
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
          :required="!isCheckboxChecked"
          :disabled="isCheckboxChecked"
          ref="fileInput"
          style="width: 370px"
        />
        <input
          v-if="receivedEventId"
          type="checkbox"
          id="file-checkbox"
          v-model="isCheckboxChecked"
        />
        <label v-if="receivedEventId" for="file-chexbox" class="crud-radio"
          >Keep the same picture</label
        >
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
import {
  createEvent,
  updateEvent,
  getEventById,
} from "../../../services/eventService";
import router from "@/router";
import store from "@/store";

export default {
  data() {
    return {
      eventInfo: {
        receivedEventId: null,
        eventName: "",
        eventCategory: "",
        eventDate: null,
        eventType: "",
        eventTimeStart: null,
        eventTimeFinish: null,
        eventPlace: "",
        eventImage: null,
        eventDescription: "",
        eventPrice: 0,
      },
      isCheckboxChecked: false,
      oldEventImage: "",
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
      const file = event.target.files[0];
      if (file) {
        this.oldEventImage = this.eventInfo.eventImage;
        this.eventInfo.eventImage = file;
      }
    },
    clearForm() {
      this.eventInfo.eventName = "";
      this.eventInfo.eventCategory = "";
      this.eventInfo.eventDate = null;
      this.eventInfo.eventType = null;
      this.eventInfo.eventTimeStart = null;
      this.eventInfo.eventTimeFinish = null;
      this.eventInfo.eventPlace = "";
      this.eventInfo.eventImage = null;
      this.eventInfo.eventDescription = "";
      this.eventInfo.eventPrice = 0;
      const fileInput = this.$refs.fileInput;
      if (fileInput) {
        fileInput.value = "";
      }
    },
    async submitForm() {
      try {
        const formData = new FormData();

        if (this.eventInfo.eventImage) {
          if (this.isCheckboxChecked) {
            this.eventInfo.eventImage = this.oldEventImage;
          }
          formData.append("image", this.eventInfo.eventImage);
        }

        formData.append("eventName", this.eventInfo.eventName);
        formData.append("eventCategory", this.eventInfo.eventCategory);
        formData.append("eventDate", this.eventInfo.eventDate);
        formData.append("eventType", this.eventInfo.eventType);
        formData.append("eventTimeStart", this.eventInfo.eventTimeStart);
        formData.append("eventTimeFinish", this.eventInfo.eventTimeFinish);
        formData.append("eventPlace", this.eventInfo.eventPlace);
        formData.append("eventDescription", this.eventInfo.eventDescription);
        formData.append("eventPrice", this.eventInfo.eventPrice);

        if (!this.receivedEventId) {
          await createEvent(formData);
          alert("Event created successfully!");
        } else {
          formData.append("id", this.receivedEventId);
          await updateEvent(formData);
          alert("Event edited successfully!");
        }

        this.clearForm();
        router.push({ name: "Home" });
      } catch (error) {
        console.error(
          "Error creating event:",
          error.response?.data || error.message
        );
        alert("Failed to create event. Please try again.");
      }
    },
    async loadEventData() {
      try {
        const event = await getEventById(this.receivedEventId);
        this.eventInfo = event;
      } catch (error) {
        console.error("Ошибка загрузки данных события:", error);
      }
    },
  },
  created() {
    this.receivedEventId = this.$route.params.id;
    if (this.receivedEventId) {
      this.loadEventData();
    }
  },
  beforeCreate() {
    if (!store.state.isAuthentificated) {
      this.$router.push("/login");
    }
  },
};
</script>
