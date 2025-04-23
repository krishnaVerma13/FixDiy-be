const express = require('express');
const router = express.Router();
const {newMessage, Findmessage, getallmwssage} = require('../controllers/contactController')
 const validateToken = require('../middleware/validateTokenHandle');

router.post('/newmessage', newMessage)

router.post('/findmessage', Findmessage);

router.get('/getallmessage', validateToken , getallmwssage); 

module.exports = router;