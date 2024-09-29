const express = require('express');
const { getAllEvents, createEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

// Маршруты CRUD операций
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;