const { app, PORT } = require('../index');
const request = require('supertest');
const axios = require('axios');


describe('PORT', () => {
    it('PORT is a number', () => {
        expect(typeof PORT).toBe('number'); // port 8000 -cause we set it to be 8000
    });

    it('PORT is 8000 on development', () => {
        expect(PORT).toBe(8000);
    });
});

// Home test 
describe('GET /', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /capsules', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /capsules', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('Get /capsules/*', () => {
    it('Should respond with JSON', () => {
        request(app)
            .get('/capsules/*')
            .set('/Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Should respond with JSON', () => {
        // console.log('app', app);
        axios.get('http://localhost:8000/capsules/serial/C103')
            .then(function (response) {
                let serialValue = response.data.capsule.serial;
                console.log('Serial Value ->', serialValue);
                expect(Boolean(serialValue)).toBe(true);
            })
    })
});

describe('GET /cores', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/cores')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

// Test for Cores Conditional
describe('Get /cores/*', () => {
    it('Should respond with JSON', () => {
        request(app)
            .get('/cores/*')
            .set('/Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Should respond with JSON', () => {
        // console.log('app', app);
        axios.get('http://localhost:8000/cores/serial/B1037')
            .then(function (response) {
                let serialValue = response.data.core.serial;
                console.log('Serial Value ->', serialValue);
                expect(Boolean(serialValue)).toBe(true);
            })
    })
});

describe('GET /crew', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/crew')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /dragons', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/dragons')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

// test for Dragons conditional
describe('Get /dragons/*', () => {
    it('Should respond with JSON', () => {
        request(app)
            .get('/dragons/*')
            .set('/Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Should respond with JSON', () => {
        // console.log('app', app);
        axios.get('http://localhost:8000/dragons/id/5e9d058859b1ffd8e2ad5f90')
            .then(function (response) {
                let serialValue = response.data.dragon.serial;
                console.log('Serial Value ->', serialValue);
                expect(Boolean(serialValue)).toBe(true);
            })
    })
});

describe('GET /landpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/landpads')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

// test for landpads conditionals
describe('Get /landpads/*', () => {
    it('Should respond with JSON', () => {
        request(app)
            .get('/landpads/*')
            .set('/Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Should respond with JSON', () => {
        // console.log('app', app);
        axios.get('http://localhost:8000/landpads/region/Florida')
            .then(function (response) {
                let serialValue = response.data.landpad.serial;
                console.log('Serial Value ->', serialValue);
                expect(Boolean(serialValue)).toBe(true);
            })
    })
});

describe('GET /launchpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

// Test for Launchpads conditionals
describe('Get /launchpads/*', () => {
    it('Should respond with JSON', () => {
        request(app)
            .get('/launchpads/*')
            .set('/Accept', 'application/json')
            .expect('Content-Type', /json/)
    });
    it('Should respond with JSON', () => {
        // console.log('app', app);
        axios.get('http://localhost:8000/launchpads/serial/C103')
            .then(function (response) {
                let serialValue = response.data.launchpad.serial;
                console.log('Serial Value ->', serialValue);
                expect(Boolean(serialValue)).toBe(true);
            })
    })
});

describe('GET /payloads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/payloads')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /roadster', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/roadster')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /rockets', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/rockets')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /ships', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/ships')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /starlink', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/starlink')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

describe('GET /history', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/history')
            .expect(200, done);
    });
    it('should respond with json', () => {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        //.expect(200, done);
    });
});

