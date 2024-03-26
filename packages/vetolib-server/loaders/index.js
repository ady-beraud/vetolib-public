const passportLoader = require('./passport');
const expressLoader = require('./express');
const routeLoader = require('../routes');

module.exports = async(app) => {
    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);

    app.use((err, req, res, next) => {
        const { message, status } = err;
        return res.status(status).send({ message });
    });
}