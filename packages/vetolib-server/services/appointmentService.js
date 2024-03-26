const createError = require('http-errors');
const AppointmentModel = require('../models/appointments');
const AppointmentModelInstance = new AppointmentModel();

module.exports = class AppointmentService {

    async createAppointment (data) {
        try {
            const appointment = await AppointmentModelInstance.saveAppointment(data);
            return appointment;
        } catch (err) {
            createError(500, err);
        }
    };

    async findAppointments (id) {
        try {
            const appointments = await AppointmentModelInstance.getAppointments(id);
            return appointments;
        } catch (err) {
            createError(500, err);
        }
    }
}