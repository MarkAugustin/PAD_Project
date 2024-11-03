import axios from "axios";
import { auth } from "./firebaseClient";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const API_URL = "http://localhost:4000/api/auth";

export async function registerUser(registrationData) {
  try {
    const response = await axios.post(`${API_URL}/register`, registrationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : "Ошибка сети");
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();
    const response = await axios.post(
      "http://localhost:4000/api/auth/verify-token",
      { token }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}
export async function logoutUser() {
  await signOut(auth);
}
