const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

// Must be done like this for Mocha
const User = mongoose.model('user');

describe('Users controller', () => {

    it('GET to /api/users/id returns a given user', done => {
        // Create a user, then return it
        const user = new User({
            username: 'homersimpson',
            password: 'pass123',
            email: 'homers@fox.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940'
        });

        user.save()
            .then(() => {
                request(app)
                    .get(`/api/users/${user._id}`)
                    .end(() => {
                        User.findById({ _id: user._id })
                            .then(user => {
                                assert(user.username === 'homersimpson');
                                done();
                            });
                    });
            });
    });

    it('POST to /api/users creates a new user', done => {
        User.count().then(count => {
            request(app)
                .post('/api/users')
                .send({
                    username: 'homersimpson',
                    password: 'pass123',
                    email: 'homers@fox.com',
                    firstname: 'Homer',
                    lastname: 'Simpson',
                    dob: '11/21/1940'
                })
                .end(() => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('PUT to /api/users/id edits an existing user', done => {
        // Create a user, edit it, and pull it back out of the DB
        const user = new User({
            username: 'homersimpson',
            password: 'pass123',
            email: 'homers@fox.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940'
        });

        user.save()
            .then(() => {
                request(app)
                    .put(`/api/users/${user._id}`)
                    .send({ firstname: 'Bart' })
                    .end(() => {
                        User.findById(user._id)
                            .then(user => {
                                assert(user.firstname === 'Bart');
                                done();
                            });
                    });
            });
    });

    it('DELETE to /api/users/id removes an existing user', done => {
        // Create a user, then delete it
        const user = new User({
            username: 'homersimpson',
            password: 'pass123',
            email: 'homers@fox.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940'
        });

        user.save()
            .then(() => {
                request(app)
                    .delete(`/api/users/${user._id}`)
                    .end(() => {
                        User.findById(user._id)
                            .then(user => {
                                assert(!user);
                                done();
                            });
                    });
            });
    });

    it('GET to /api/users/id/nearby returns events near the user', done => {
        // NOTE: For now, let's create different users to perform this test
        // TODO: Refactor test to find events, not other users

        const sacramentoUser = new User({
            username: 'sacuser',
            password: 'pass123',
            email: 'sac@sac.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940',
            geometry: { type: 'Point', coordinates: [-121.538941, 38.607319] }
        });

        const losAngelesUser = new User({
            username: 'lauser',
            password: 'pass123',
            email: 'la@la.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940',
            geometry: { type: 'Point', coordinates: [-118.486164, 34.002769] }
        });

        const newYorkUser = new User({
            username: 'nyuser',
            password: 'pass123',
            email: 'ny@ny.com',
            firstname: 'Homer',
            lastname: 'Simpson',
            dob: '11/21/1940',
            geometry: { type: 'Point', coordinates: [-73.986139, 40.765058] }
        });

        Promise.all([sacramentoUser.save(), losAngelesUser.save(), newYorkUser.save()])
            .then(() => {
                request(app)
                    // Could extract the points from sacramentoUser, but that would
                    // be too messy
                    .get(`/api/users/${sacramentoUser._id}/nearby?lng=-121.5&lat=38.6`)
                    .end((err, response) => {
                        console.log(response);
                        assert(response.body.length === 2);
                        assert(response.body[0].username === 'sacuser');
                        assert(response.body[1].email === 'la@la.com');
                        done();
                    });
            });
    });
});