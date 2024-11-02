const admin = require("../config/firebaseAdmin");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  console.log("Получены данные:", { email, password, name });

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "Пользователь с таким email уже существует" });
    }
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
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
      message: "Пользователь успешно зарегистрирован",
      userId: userRecord.uid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
