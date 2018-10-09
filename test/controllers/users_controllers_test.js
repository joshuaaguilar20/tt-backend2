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
});