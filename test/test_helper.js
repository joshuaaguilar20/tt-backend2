const mongoose = require('mongoose');

// Connect to test database
before(done => {
    mongoose.connect('mongodb://localhost/tt-be-db-test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

// Drop collections
beforeEach(done => {
    const { users } = mongoose.connection.collections;
    users.drop()
        // ensure indices exist for geometry data
        .then(() => users.ensureIndex({'geometry.coordinates': '2dsphere'}))
        .then(() => done())
        .catch(() => done()); // Needed for the first time this file is executed
});