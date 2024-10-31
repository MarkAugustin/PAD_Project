const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'pad-project-eb1af.appspot.com'
});

const bucket = admin.storage().bucket()
const db = admin.firestore();

module.exports = { db, bucket };
