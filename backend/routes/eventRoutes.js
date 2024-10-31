const express = require('express');
const multer = require('multer');
const eventController = require('../controllers/eventController'); // Ваш контроллер

const router = express.Router();
router.get("/events/:id", eventController.getEventById);

// Настройка multer для загрузки файлов
const upload = multer({ storage: multer.memoryStorage() });

// Маршрут для создания события с загрузкой изображения
router.post('/', upload.single('image'), eventController.createEvent);
router.put('/:id', upload.single('image'), eventController.updateEvent);

// Можно добавить другие CRUD маршруты (например, получение, обновление и удаление событий)
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
