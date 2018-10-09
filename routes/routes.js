const UsersController = require('../controllers/users_controller');

module.exports = (app) => {

    app.post('/api/users', UsersController.create);

    // id will be availabe in req.params.id
    app.put('/api/users/:id', UsersController.edit);

    app.delete('/api/users/:id', UsersController.delete);
};