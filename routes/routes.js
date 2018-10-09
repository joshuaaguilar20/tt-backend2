const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
    // TODO: Eliminate this route
    // app.get('/api', UsersController.name);

    app.post('/api/users', UsersController.create);
};