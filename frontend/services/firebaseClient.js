import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4RoH7Xps3-Ud4JemImFN3_E8uubX3cHg",
  authDomain: "pad-project-eb1af.firebaseapp.com",
  projectId: "pad-project-eb1af",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
