const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

// Must be done like this for Mocha
const User = mongoose.model('user');

describe('Users controller', () => {
    it('POST to api/users creates a new user', (done) => {
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
});