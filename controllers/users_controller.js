const User = require('../models/user');

module.exports = {
    // TODO: Eliminate name()
    // name(req, res) {
    //     res.send({ name: 'bob' });
    // },

    create(req, res) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.send(user));
    }
};