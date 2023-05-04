const request = require('supertest');
const express = require('express');
const app = express()
const axios = require('axios');

app.set('view engine', 'ejs');

// Home Route
app.get('/', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            res.json({ company: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/capsules', function (req, res) {
    axios.get('http://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            const capsulesData = response.data
            capsulesData.forEach(capsule => {
                // console.log(capsule)
            });
            res.json({ data: response.data }) // our response to the user
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Scenario 1 - return a single capsule
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('http://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // handle success
//             // console.log(response.data);
//             //
//             for (let i = 0; i < response.daa.length; i++) {
//                 let capsule = response.data[i];
//                 let splitSerial = req.params.serial.split('');
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('')
//                 // upperCaseSerial.join('');
//                 //console.log('capsule', capsule): // { serial: 'C101', ...}
//                 console.log('UpperCase Serial', upperCaseSerial);
//                 return res.json({ capsule: capsule });
//             }
//         })
//         .catch(function (error) {
//             //console.log(error);
//             return res.json({ message: 'Data not found. Please try again later.' });
//         });
//     return res.json({ message: 'Capsule does not exist' });
// })

app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // print req.params
            // console.log('req.params', req.params); // print an object
            // console.log('api response', response.data); // print an array of capsules
            // run a for loop to search based of the key from req.params
            const capsuleArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let capsule = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
                if (req.params['0'].includes('serial')) {
                    if (capsule.serial === userRequest[1].toUpperCase()) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'id') {
                    if (capsule.id === userRequest[1]) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (capsule.reuse_count === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'water_landings') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (capsule.water_landings === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'land_landings') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (capsule.land_landings === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'last_update') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (capsule.last_update === countValue) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'status') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let value = userRequest[1]; // Number(userRequest[1])
                    // check the count value
                    if (capsule.status === value) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'type') {
                    // check to see which capsule have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let value = userRequest[1]; // Number(userRequest[1])
                    // check the count value
                    if (capsule.type === value) {
                        capsuleArray.push(capsule);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }

                // @todo - we need make a conditional for id
                // @todo - we need make a conditional for water_landings
                // @todo - we need make a conditional for last_update
                // @todo - we need make a conditional for status
                // @todo - we need make a conditional for type

            }
            // console.log('Capsules Array', { capsules: capsuleArray })
            return res.json({ capsules: capsuleArray });
        })
});


app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const coresData = response.data
            coresData.forEach(core => {
                console.log(core)
            });
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// 5 Conditionals from Core http://localhost:8000/cores/serial/B1037 
app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // print req.params
            console.log('req.params', req.params); // print an object
            console.log('api response', response.data); // print an array of capsules
            // run a for loop to search based of the key from req.params
            const coreArray = []; // test that this exists
            for (let i = 0; i < response.data.length; i++) { // could test that this returns a number
                let core = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (req.params['0'].includes('serial')) {
                    if (core.serial === userRequest[1].toUpperCase()) {
                        return res.json({ core });
                    }
                } else if (userRequest[0] === 'id') {
                    if (core.id === userRequest[1]) {
                        return res.json({ core });
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    // check to see which core have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (core.reuse_count === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'status') {
                    // check to see which core have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (core.status === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'launches') {
                    // check to see which core have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (core.launches === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'serial') {
                    // check to see which core have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                    // check the count value
                    if (core.serial === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'asds_landings') {
                    // check to see which core have the reuse count
                    // question: is the value of reuse_count a string or number when it comes in
                    // from the user...
                    let value = userRequest[1]; // Number(userRequest[1])
                    // check the count value
                    if (core.asds_landings === value) {
                        coreArray.push(core);
                    }

                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ cores: coreArray });
        })
});

app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const dragonsData = response.data
            dragonsData.forEach(dragon => {
                console.log(dragon)
            }); res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// 5 Conditional for dragons http://localhost:8000/dragons/id/5e9d058859b1ffd8e2ad5f90
app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            let dragonArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let dragon = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (dragon.id === userRequest[1]) {
                        return res.json({ dragon });
                    }
                } else if (userRequest[0] === 'name') {
                    if (dragon.name.toLowerCase() === userRequest[1].toLowerCase()) {
                        return res.json({ dragon });
                    }
                } else if (userRequest[0] === 'type') {
                    if (dragon.type.toLowerCase() === userRequest[1].toLowerCase()) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'active') {
                    let value = userRequest[1].toLowerCase() === 'true';
                    if (dragon.active === value) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'crew_capacity') {
                    let value = parseInt(userRequest[1]);
                    if (dragon.crew_capacity === value) {
                        dragonArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ dragons: dragonArray });
        });
});


app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const landpadsData = response.data
            landpadsData.forEach(landpad => {
                console.log(landpad)
            }); res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// 5 conditional for landpads http://localhost:8000/landpads/region/Florida
app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            let landpadArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let landpad = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (landpad.id === userRequest[1]) {
                        return res.json({ landpad });
                    }
                } else if (userRequest[0] === 'name') {
                    if (landpad.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpad });
                    }
                } else if (userRequest[0] === 'status') {
                    if (landpad.status === userRequest[1]) {
                        landpadArray.push(landpad);
                    }
                } else if (userRequest[0] === 'type') {
                    if (landpad.type === userRequest[1]) {
                        landpadArray.push(landpad);
                    }
                } else if (userRequest[0] === 'region') {
                    if (landpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        landpadArray.push(landpad);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ landpads: landpadArray });
        });
});


app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const launchpadsData = response.data
            launchpadsData.forEach(launchpad => {
                console.log(launchpad)
            }); res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// 5 conditional for launchpads http://localhost:8000/launchpads/id/5e9e4502f509094188566f88
app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            let launchpadArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'id') {
                    if (launchpad.id === userRequest[1]) {
                        return res.json({ launchpad });
                    }
                } else if (userRequest[0] === 'status') {
                    if (launchpad.status === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'region') {
                    if (launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'name') {
                    if (launchpad.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'locality') {
                    if (launchpad.locality.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ launchpads: launchpadArray });
        });
});

app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// 5 condintionals for launches http://localhost:8000/launches/flight_number/1
app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            let launchesArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (userRequest[0] === 'launchpad') {
                    if (launch.launchpad === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'flight_number') {
                    if (launch.flight_number === parseInt(userRequest[1])) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'name') {
                    if (launch.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'date_unix') {
                    if (launch.date_unix === parseInt(userRequest[1])) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'date_precision') {
                    if (launch.date_precision.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchesArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again.' });
                }
            }
            return res.json({ launches: launchesArray });
        });
});


app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const payloadsData = response.data
            payloadsData.forEach(payload => {
                console.log(payload)
            }); res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const rocketsData = response.data
            rocketsData.forEach(rocket => {
                console.log(rocket)
            });
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            console.log(response.data);
            const shipsData = response.data
            shipsData.forEach(ship => {
                console.log(ship)
            });
            // console.log(response.data);
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            res.json({ data: response.data }) // our response to the user
        }) // no semicolin so that the catch will be included
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});


// SEARCH
app.get("/search", (req, res) => {
    let result = {};
    // { name: 'capsules', serial: 'C101' }
    // How would we make an axios when the item is different?
    axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
        .then(function (response) {
            for (let key in req.query) {
                if (key === 'item') {
                    // do nothing
                    continue;
                } else {
                    // run for loop to search for key and value
                    // key -> serial
                    // req.query[key] -> C101
                    for (let i = 0; i < response.data.length; i++) {
                        let capsule = response.data[i];
                        if (capsule.serial === req.query[key]) { // if the response capsule.serial is equal the search item C103
                            return res.json({ capsule });
                        }
                    }
                }
            }
            return res.json({ message: 'Data not found. Please try again...' })
        })
        .catch(function (error) {
            // console.log(error);
            return res.json({ message: 'Data not found. Please try again later.' });
        });
});

// HTML
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/blog-directory', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log('Server is running on PORT', PORT);
});

module.exports = {
    app,
    PORT
}
