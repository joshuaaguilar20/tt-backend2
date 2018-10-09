const expressGraphQL = require('express-graphql');
const graphQLSchema = require('../schemas/userSchema');
const UsersController = require('../controllers/users_controller');

module.exports = (app) => {

    // ************************************
    // GraphQL testing using GraphiQL tool
    // available at http://localhost:3050/graphql
    app.use('/graphql', expressGraphQL({
        schema: graphQLSchema, 
        graphiql: true
    }));


    // ************************************
    // User Routes
    app.post('/api/users', UsersController.create);

    // id will be availabe in req.params.id
    app.put('/api/users/:id', UsersController.edit);

    app.delete('/api/users/:id', UsersController.delete);
    app.get('/api/users/:id', UsersController.get);

    // Get locations near the user
    app.get('/api/users/:id/nearby', UsersController.nearby);

    // ************************************
    
};