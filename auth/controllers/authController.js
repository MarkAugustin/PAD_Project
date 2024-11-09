const admin = require("../config/firebaseAdmin");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists" });
    }
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    res.status(201).json({
      message: "User successfully registered",
      userId: userRecord.uid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({
      uid: decodedToken.uid,
      name: decodedToken.name,
      email: decodedToken.email,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { registerUser, verifyToken };
