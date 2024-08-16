const axios = require('axios'); // Import axios in CommonJS

const ORS_API_KEY = '5b3ce3597851110001cf6248aec53714f90247f79aa1aee769980d16';
const EARTH_RADIUS_KM = 6371;

const getPlaceName = async (lat, lng) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        format: 'json',
        lat: lat,
        lon: lng,
      },
    });
    const data = response.data;
    console.log(`Place name: ${data.display_name}`);
  } catch (error) {
    console.error("Error fetching place name:", error);
  }
};

function convertlatLongToLongLat(latLang)
{
    let lat = latLang.split(",")[0];
    let long = latLang.split(",")[1];

    return long + "," + lat;
}

async function getDistance(origin, destination) {
  try {
  origin = convertlatLongToLongLat(origin);
  destination = convertlatLongToLongLat(destination);
     
    const response = await axios.get(`http://router.project-osrm.org/route/v1/bike/${origin};${destination}?overview=false&geometries=polyline&steps=true`);
    console.log("response ",response.data );
    const route = response.data.routes[0];
    
    const distance = route.distance / 1000; 
    const duration = route.duration / 60; 

    console.log(`Distance: ${distance.toFixed(2)} km`);
    console.log(`Duration: ${duration.toFixed(2)} minutes`);

    return { distance, duration}
} catch (error) {
    console.error('Error fetching route:', error);
}
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = angle => (Math.PI / 180) * angle;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

module.exports = { getPlaceName, getDistance, haversineDistance };
