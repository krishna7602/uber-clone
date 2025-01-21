const axios = require('axios');


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        
    }
};



module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Check the API-level status
    if (data.status !== 'OK') {
      throw new Error(`Google Maps API error: ${data.error_message || 'Unknown error'}`);
    }

    // Extract elements safely
    const rows = data.rows;
    if (!rows || rows.length === 0 || !rows[0].elements || rows[0].elements.length === 0) {
      throw new Error('Invalid response structure from Google Maps API');
    }

    const element = rows[0].elements[0];

    // Check for specific route-level status
    if (!element || element.status !== 'OK') {
      if (element.status === 'NOT_FOUND') {
        throw new Error('One or both locations could not be geocoded');
      }
      if (element.status === 'ZERO_RESULTS') {
        throw new Error('No route found between the specified locations');
      }
      throw new Error(`Route error: ${element.status}`);
    }

    // Ensure distance and duration are available
    if (!element.distance || !element.duration) {
      throw new Error('Distance or duration data is missing');
    }

    // Return parsed values
    return {
      distance: element.distance.text,
      duration: element.duration.text,
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Error in getDistanceTime:', error.message);

    // Throw a more user-friendly error
    throw new Error('Failed to fetch distance and time. Please check the input and try again.');
  }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

  
