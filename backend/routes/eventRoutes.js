const express = require('express');
const multer = require('multer');
const eventController = require('../controllers/eventController');

const router = express.Router();
router.get("/events/:id", eventController.getEventById);

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), eventController.createEvent);
router.put('/:id', upload.single('image'), eventController.updateEvent);

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
