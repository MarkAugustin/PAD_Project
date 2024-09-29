import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Адрес вашего микросервиса

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_URL}/events/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
