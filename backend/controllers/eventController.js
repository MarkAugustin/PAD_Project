const { db } = require('../config/firebase');

// Получить все события
const getAllEvents = async (req, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Создать новое событие
const createEvent = async (req, res) => {
  try {
    const newEvent = req.body;
    const eventRef = await db.collection('events').add(newEvent);
    res.status(201).send({ id: eventRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Удалить событие
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('events').doc(id).delete();
    res.status(200).send({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllEvents, createEvent, deleteEvent };
