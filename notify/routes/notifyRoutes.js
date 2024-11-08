const express = require("express");
const notifyController = require("../controllers/notifyController");
const router = express.Router();

router.post("/send-notify", notifyController.sendNotification);
router.post("/toggle-sub", notifyController.toggleSubscription);
router.post("/check-sub", notifyController.checkSubscription);

module.exports = router;
