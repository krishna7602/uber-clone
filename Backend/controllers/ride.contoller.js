const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const {body,query}=require('express-validator')

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  // Log to debug input fields
  console.log('User information:', req.user);

  if (!req.user?._id) {
    return res.status(401).json({ error: 'User not authenticated' });
}

  if (!pickup || !destination || !vehicleType) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    return res.status(201).json(ride);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
  };

module.exports.getFare=async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination} = req.query;
  console.log(pickup,destination)

  try {
    const fare = await rideService.getFare(pickup,destination);
    return res.status(200).json( fare );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}
  