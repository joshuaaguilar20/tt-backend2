const User = require('../models/user');

module.exports = {
    // TODO: Eliminate name()
    // name(req, res) {
    //     res.send({ name: 'bob' });
    // },

    create(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.send(user))
            .catch(next);
    }
};