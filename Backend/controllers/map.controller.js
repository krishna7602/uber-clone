const mapService=require('../services/maps.service')
const {validationResult}=require("express-validator")
const axios = require('axios');

module.exports.getCoordinates=async(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { address } = req.query;
    console.log(req.query)

    try {
        
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json({ coordinates });
    } catch (error) {
        res.status(500).json({message:'internal-server-error'})
        next(error);
    }
}


module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination are required' });
        }

        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json({ distanceTime });
        
    } catch (error) {
        res.status(500).json({ message: 'internal-server-error' });
        next(error);
    }
}



module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json( suggestions );
    } catch (error) {
        res.status(500).json({ message: 'internal-server-error' });
        next(error);
    }
  };
  