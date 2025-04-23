const express = require('express');
const router = express.Router();
const {newAppointment, Findbooking} =require('../controllers/bookAppController')
 const validateToken = require('../middleware/validateTokenHandle');

router.post('/createnew', newAppointment)

router.post('/findbooking', Findbooking);

module.exports = router;