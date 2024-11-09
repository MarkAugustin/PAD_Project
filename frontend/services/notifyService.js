const axios = require("axios");

const API_URL = process.env.VUE_APP_NOTIFY_API_URL;

async function sendNotification(eventName, eventDesc) {
  try {
    const response = await axios.post(`${API_URL}/send-notify`, {
      eventName,
      eventDesc,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw error;
  }
}

async function toggleSubscription(email) {
  try {
    const response = await axios.post(`${API_URL}/toggle-sub`, {
      email,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error when toggling subscription to notifications:", error);
    throw error;
  }
}

async function checkSubscription(email) {
  try {
    const response = await axios.post(`${API_URL}/check-sub`, {
      email,
    });
    return response.data.state;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  sendNotification,
  toggleSubscription,
  checkSubscription,
};
