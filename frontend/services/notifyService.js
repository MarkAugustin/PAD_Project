const axios = require("axios");

const API_URL = "http://localhost:3000/api/notifications";

async function sendNotification(eventName, eventDesc) {
  try {
    const response = await axios.post(`${API_URL}/send-notify`, {
      eventName,
      eventDesc,
    });

    console.log("Уведомления успешно отправлены:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке уведомлений:", error);
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
    console.error("Ошибка при подписке на уведомления:", error);
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
    console.error("Ошибка при подписке на уведомления:", error);
    throw error;
  }
}

module.exports = {
  sendNotification,
  toggleSubscription,
  checkSubscription,
};
