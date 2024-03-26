const db = require('../db');

module.exports = class AppointmentModel {

    async saveAppointment(data) {
        try {
            const { date, time, professional_id, user_id, animal} = data;
            const statement = `
            INSERT INTO appointments (date, time, professional_id, user_id, animal)
            VALUES ($1, $2, $3, $4, $5)
          `;
            const value = [date, time, professional_id, user_id, animal];
            const result = await db.query(statement, value);
            if (result.rows?.length) {
                return result.rows;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    async getAppointments(id) {
        try {
            const statement = `
            SELECT appointments.*,
            professionals.first_name AS professional_first_name,
            professionals.last_name AS professional_last_name,
            professionals.street_name AS professional_street_name,
            professionals.city AS professional_city,
            professionals.postcode AS professional_postcode,
            professionals.job AS professional_job,
            professionals.telephone AS professional_tel,
            professionals.digicode AS professional_digicode,
            to_date(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                replace(
                    regexp_replace(appointments.date, '^(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche) ', '', 'i'),
                    'janvier', 'January'),
                    'février', 'February'),
                    'mars', 'March'),
                    'avril', 'April'),
                    'mai', 'May'),
                    'juin', 'June'),
                    'juillet', 'July'),
                    'août', 'August'),
                    'septembre', 'September'),
                    'octobre', 'October'),
                    'novembre', 'November'),
                    'décembre', 'December'),
                    'DD Month'
                    ) AS converted_date
            FROM appointments
            INNER JOIN professionals ON appointments.professional_id = professionals.id
            WHERE appointments.user_id = $1
            ORDER BY converted_date, appointments.time;`;
            const value = [id];
            const result = await db.query(statement, value);
            if (result.rows?.length) {
                return result.rows;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }
}