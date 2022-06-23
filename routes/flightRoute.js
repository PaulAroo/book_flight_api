const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example)

router.post('/book-flight', controller.bookFlight)

router.get('/all-flights', controller.allFlights)

router.get('/single-flight/:id', controller.singleFlight)

router.put('/update-flight', controller.updateFlight)

router.delete('/delete-flight/:id', controller.deleteFlight)

module.exports = router;

