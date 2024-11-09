const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);

const PORT = process.env.CRUD_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
