const express = require('express');
const router = express.Router();
const { BookingController } = require('../../controllers/index');
const bookingController = new BookingController();

router.get('/info', (req, res) => {
    return res.status(200).json({
        messsage: 'Hi i am inside the router'
    })
})
router.post('/booking', bookingController.create);
router.post('/publish', bookingController.sendToQueue);
module.exports = router;