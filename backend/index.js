const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Роуты для работы с событиями
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
