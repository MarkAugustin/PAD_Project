const express = require("express");
const notifyRoutes = require("./routes/notifyRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());
app.use("/api/notifications", notifyRoutes);

const PORT = process.env.NOTYF_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
