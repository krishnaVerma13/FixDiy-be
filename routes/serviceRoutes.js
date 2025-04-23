const express = require('express');
const router = express.Router();
// const { registerUser, loginUser, currentUser, FindUser, } = require('../controllers/userController');
const { registerService, loginService, Findsp, currentService} = require('../controllers/serviceController');
 const validateToken = require('../middleware/validateTokenHandle');

router.post('/register', registerService)

router.post('/login', loginService);

router.get('/current',validateToken , currentService);

router.post('/finduser', Findsp);

module.exports = router;