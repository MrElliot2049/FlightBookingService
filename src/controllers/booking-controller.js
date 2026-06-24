const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMAINDER_BINDING_KEY } = require('../config/server-config');
const bookingService = new BookingService();

class BookingController {
    constructor() {
    }
    async sendToQueue(req, res) {
        const channel = await createChannel();
        const data = {data: {
            subject:'This ticket is from queue',
            content:'Hello how are you',
            recepientEmail:'elliotalderson00710@gmail.com',
            notificationTime:' 2026-06-16 17:47:39',},
            service: 'CREATE_TICKET'
        };
        publishMessage(channel, REMAINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(StatusCodes.OK).json({
            message: 'Successfully sent message to the queue'
        })
    }
    async create(req, res){
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Booking Successfull',
                status: true,
                err : {}
            });
        } catch (error) {
            return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: error.message,
                status: false,
                err : error.explanation
            });
        }
    }
}


module.exports = BookingController;