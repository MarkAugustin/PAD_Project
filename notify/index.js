const express = require("express");
const notifyRoutes = require("./routes/notifyRoutes");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notify", notifyRoutes);

const PORT = process.env.NOTIFY_PORT;
app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
