const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK успешно инициализирован.");
} catch (error) {
  console.error("Ошибка при инициализации Firebase Admin SDK:", error);
}

module.exports = admin;