const express = require('express')
const axios = require('axios');
const router=express.Router();
const mapController=require('../controllers/map.controller')
const authmiddleware = require('../middlewares/auth.middleware');
const {getCoordinates}=require('../controllers/map.controller')
const {query} = require('express-validator')


router.get('/get-coordinate',
    query('address').isString().isLength({min:3})
    ,authmiddleware.authUser,getCoordinates
)


router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authmiddleware.authUser,
    mapController.getDistanceTime
)


router.get('/get-suggestions',
    query('input').isString(),
    authmiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)




module.exports=router