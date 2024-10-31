import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Адрес микросервиса

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    const events = response.data;

    const eventsWithImages = events.map((event) => ({
      ...event,
      eventImage: event.eventImage ? event.eventImage : "",
    }));

    return eventsWithImages;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения события по id:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const updateEvent = async (eventData) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${API_URL}/events/${eventData.get("id")}`,
      data: eventData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
