const express = require('express');
const router = express.Router();
const {body} =require('express-validator');
const captainController = require('../controllers/captain.controller');
const {authCaptain} = require('../middlewares/auth.middleware');
const authmiddleware = require('../middlewares/auth.middleware');


router.post('/register',
    [body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('fullName').isObject().withMessage('Invalid Fullname'),
    body('fullName.firstName').isLength({min:2}).withMessage('Firstname must be at least 2 characters long'),
    body('vehicle').isObject().withMessage('Invalid Vehicle'),
    body('vehicle.color').isString().withMessage('Invalid Vehicle Color'),
    body('vehicle.plate').isString().withMessage('Invalid Vehicle Plate'),
    body('vehicle.capacity').isNumeric().withMessage('Invalid Vehicle Capacity'),
    body('vehicle.vehicleType').isString().withMessage('Invalid Vehicle Type '),
    ],captainController.registerCaptain
)

router.post('/login',
    [body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    ],captainController.loginCaptain
)

router.get('/profile',authmiddleware.authCaptain, captainController.getProfile)

router.get('/logout',authmiddleware.authCaptain, captainController.logoutCaptain)



module.exports = router;