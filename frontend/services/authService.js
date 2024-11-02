import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export async function registerUser(registrationData) {
  try {
    const response = await axios.post(`${API_URL}/register`, registrationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Ошибка сети');
  }
}
