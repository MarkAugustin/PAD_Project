const transporter = require("../config/emailConfig");
const db = require("../config/firebaseAdmin");

const subscribersCollection = db.collection("subscribers");

const sendNotification = async (req, res) => {
  const { eventName, eventDesc } = req.body;

  try {
    const snapshot = await subscribersCollection.get();
    if (snapshot.empty) {
      return res.status(200).json({ message: "No subscribers to notify" });
    }
    const subscribers = snapshot.docs.map((doc) => doc.data().email);

    console.log(subscribers);

    const mailOptions = {
      from: "7circleofhell@gmail.com",
      to: subscribers.join(","),
      subject: `Eventify. Новое мероприятие: ${eventName}`,
      text: `Привет! У нас есть новое мероприятие: ${eventName}. \nПодробнее: \n${eventDesc}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Error sending emails", details: error });
  }
};

const toggleSubscription = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const doc = await subscribersCollection.doc(email).get();

    if (doc.exists) {
      await subscribersCollection.doc(email).delete();
      console.log(`Unsubscribed: ${email}`);
      res.status(200).json({ message: "Unsubscribed successfully" });
    } else {
      await subscribersCollection.doc(email).set({ email });
      console.log(`Subscribed: ${email}`);
      res.status(200).json({ message: "Subscribed successfully" });
    }
  } catch (error) {
    console.error("Error toggling subscription:", error);
    res
      .status(500)
      .json({ error: "Error toggling subscription", details: error });
  }
};

const checkSubscription = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const doc = await subscribersCollection.doc(email).get();

    if (doc.exists) {
      res.status(200).json({ state: true });
    } else {
      res.status(200).json({ state: false });
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    res
      .status(500)
      .json({ error: "Error checking subscription", details: error });
  }
};

module.exports = {
  sendNotification,
  toggleSubscription,
  checkSubscription,
};
