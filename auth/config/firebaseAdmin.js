const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccount.json");
require("dotenv").config({ path: "../.env" });

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  });
} catch (error) {
  console.error("Error Firebase Admin SDK:", error);
}

module.exports = admin;
