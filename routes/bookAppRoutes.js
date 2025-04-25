const express = require('express');
const router = express.Router();
const {newAppointment, Findbooking,FindAllBookings} =require('../controllers/bookAppController')
 const validateToken = require('../middleware/validateTokenHandle');

router.post('/createnew', newAppointment)

router.post('/findbooking', Findbooking);

router.get('/findAllbooking', FindAllBookings);

module.exports = router;