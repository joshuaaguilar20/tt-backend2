const User = require('../models/user');

// TODO: Change maxDistance default to something reasonable
const maxDistance = 1609000; // in meters, approximately 1000 miles

module.exports = {
    get(req, res, next) {
        // const userId = req.params.id;

        // User.findById({ _id: userId })
        //     .then(user => res.status(200).send(user))
        //     .catch(next);

        const username = req.params.username;
        console.log("USERNAME (users_controller): ", username);

        User.findOne({ username })
            .then(user => {
                console.log("USER (users_controllers): ", user);
                res.status(200).send(user)
            })
            .catch(next);
    },

    create(req, res, next) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.send(user))
            .catch(next);
    },

    edit(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.findByIdAndUpdate({ _id: userId }, userProps)
            .then(() => User.findById({ _id: userId })) // Need to get the updated user back
            .then(user => res.send(user))
            .catch(next);
    },

    delete(req, res, next) {
        const userId = req.params.id;

        User.findByIdAndRemove({ _id: userId })
            .then(user => res.status(204).send(user))
            .catch(next);
    },

    // Returns events near the user's current geographical position
    nearby(req, res, next) {
        // GET requests do not have a body, so lat and long
        // parameters will be contained in the query string
        const { lng, lat } = req.query;

        // NOTE: geoNear() is deprecated
        // User.geoNear({
        //     type: 'Point',
        //     coordinates: [parseFloat(lng), parseFloat(lat)],
        // }, {
        //         spherical: true,
        //         maxDistance
        //     }
        // )
        //     .then(localEvents => res.send(localEvents))
        //     .catch(next);

        User.
            aggregate([{
                $geoNear: {
                    near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "dist.calculated",
                    maxDistance,
                    spherical: true
                }
            }])
            .then(users => {
                res.send(users)
            })
            .catch(next);
    }
};