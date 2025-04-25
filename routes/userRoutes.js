const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, FindUser,FindAllUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandle');

router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/current',validateToken , currentUser);

router.post('/finduser', FindUser);

router.get('/findalluser', FindAllUser);

module.exports = router;