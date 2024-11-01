const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes'); // Роуты для событий
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Роуты для работы с событиями (включая загрузку изображения)
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
