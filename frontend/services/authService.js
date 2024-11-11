import axios from "axios";
import { auth } from "./firebaseClient";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const API_URL = process.env.VUE_APP_AUTH_API_URL;

export async function registerUser(registrationData) {
  try {
    const response = await axios.post(`${API_URL}/register`, registrationData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.error : "Network error"
    );
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
    const response = await axios.post(`${API_URL}/verify-token`, { token });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
export async function logoutUser() {
  await signOut(auth);
}
