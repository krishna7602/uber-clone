const rideModel=require('../models/ride.model')
const mapService=require('../services/maps.service')
const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination locations are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  // Debug distanceTime output
  console.log('Distance and Time from mapService:', distanceTime);

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error('Failed to fetch valid distance and duration from map service');
  }

  const parseDistance = (distanceStr) => {
    if (!distanceStr) return 0;
    const distance = parseFloat(distanceStr.split(' ')[0]);
    return isNaN(distance) ? 0 : distance;
  };

  const parseDuration = (durationStr) => {
    if (!durationStr) return 0;
    const timeParts = durationStr.split(' ');
    let totalMinutes = 0;

    timeParts.forEach((part, index) => {
      if (part.includes('hour')) {
        totalMinutes += parseInt(timeParts[index - 1], 10) * 60;
      } else if (part.includes('min')) {
        totalMinutes += parseInt(timeParts[index - 1], 10);
      }
    });

    return totalMinutes || 0;
  };

  const distanceKm = parseDistance(distanceTime.distance);
  const durationMinutes = parseDuration(distanceTime.duration);

  const fare = {
    auto: 30 + distanceKm * 10 + durationMinutes * 2,
    car: 50 + distanceKm * 15 + durationMinutes * 3,
    motorcycle: 20 + distanceKm * 8 + durationMinutes * 1.5,
  };

  return fare;
}

module.exports.getFare=getFare
  


  function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  // Debugging input parameters
  console.log('Service input:', { user, pickup, destination, vehicleType });

  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  

  const fare = await getFare(pickup, destination);

  // Log fare structure to debug
  console.log('Fare structure:', fare);

  if (!fare[vehicleType]) {
    throw new Error('Invalid vehicle type'); // Ensure `vehicleType` matches the fare structure
  }

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

  

