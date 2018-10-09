const assert = require('assert');
const request = require('supertest'); // Used to simulate HTTP requests
const app = require('../app');

// TODO: Eliminate this test
// describe('The express app', () => {
//     it('handles a GET request to /api', (done) => {
//         request(app)
//             .get('/api')
//             .end((err, response) => {
//                 assert(response.body.name === 'bob');
//                 done();
//             });
//     });
// });