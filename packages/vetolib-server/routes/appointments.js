const express = require('express');
const router = express.Router();

const AppointmentService = require('../services/appointmentService');
const AppointmentServiceInstance = new AppointmentService();

module.exports = (app) => {
    app.use('/api/appointment', router);

    router.put('/new', async (req, res) => {
        try {
            const data = req.body;
            const response = await AppointmentServiceInstance.createAppointment(data);
            res.status(200).send(response);
        } catch (err) {
            throw err;
        }
    })

    router.get('/findById', async (req, res) => {
        try {
            let {id} = req.query;
            if (req.user) {
                id = req.user.id;
            }
            const response = await AppointmentServiceInstance.findAppointments(id);
            res.status(200).send(response);
        } catch (err) {
            throw err;
        }
    })
}