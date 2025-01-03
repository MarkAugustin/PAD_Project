const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.AUTH_PORT;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
