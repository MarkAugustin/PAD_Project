const { db, bucket } = require('../config/firebase');

const createEvent = async (req, res) => {
  try {
    const newEvent = req.body;

    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    const eventRef = await db.collection('events').add(newEvent);
    const eventId = eventRef.id;

    const fileName = `${eventId}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      return res.status(500).send({ error: 'Upload failed', details: error.message });
    });

    blobStream.on('finish', async () => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

      await db.collection('events').doc(eventId).update({
        eventImage: imageUrl
      });

      res.status(201).send({ id: eventId });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    // Запрашиваем все документы из коллекции 'events'
    const eventsSnapshot = await db.collection('events').get();

    // Проверяем, есть ли события в базе
    if (eventsSnapshot.empty) {
      return res.status(404).send({ message: 'No events found' });
    }

    // Преобразуем документы в массив объектов
    const events = eventsSnapshot.docs.map(doc => ({
      id: doc.id,  // Добавляем ID события
      ...doc.data()  // Добавляем остальные данные события
    }));

    // Отправляем массив событий как ответ
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventRef = db.collection("events").doc(eventId);
    const doc = await eventRef.get();

    if (!doc.exists) {
      return res.status(404).send({ error: "Event not found" });
    }

    res.status(200).send({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Ошибка получения события по id:", error);
    res.status(500).send({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;

    if (req.file) {
      const fileName = `${eventId}`;
      const fileUpload = bucket.file(fileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobStream.on('error', (error) => {
        return res.status(500).send({ error: 'Upload failed', details: error.message });
      });

      blobStream.on('finish', async () => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

        updatedData.eventImage = imageUrl;

        await db.collection('events').doc(eventId).update(updatedData);

        res.status(200).send({ id: eventId, ...updatedData });
      });

      blobStream.end(req.file.buffer);
    } else {
      await db.collection('events').doc(eventId).update(updatedData);
      res.status(200).send({ id: eventId, ...updatedData });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params; // Получаем ID события из параметров запроса

    // Сначала получаем данные события
    const eventRef = db.collection('events').doc(id);
    const eventSnapshot = await eventRef.get();

    if (!eventSnapshot.exists) {
      return res.status(404).send({ error: 'Event not found' });
    }

    const eventData = eventSnapshot.data();
    
    // Удаляем изображение из Firebase Storage, если оно существует
    if (eventData.eventImage) {
      const fileName = `${id}`;
      const fileRef = bucket.file(fileName);
      await fileRef.delete();
    }

    // Удаляем событие из Firestore
    await eventRef.delete();

    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
