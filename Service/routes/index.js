const express = require('express');
const router = express.Router();

const registrationCtrl = require('../controllers/registration.controller');
const loginCtrl = require('../controllers/login.controller');
const homeCtrl = require('../controllers/home.controller')
const { isAuthenticate } = require('../middlewares/authenticate');
const { refreshToken } = require('../controllers/refreshToken.controller')

//Authentication
router.post('/users/register',registrationCtrl.register)
router.post('/users/login',loginCtrl.login)
router.get('/home', isAuthenticate, homeCtrl.home)
router.get('/refresh',refreshToken)

module.exports = router