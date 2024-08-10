const fetch = require('node-fetch');

const getPlaceName = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    console.log(`Place name: ${data.display_name}`);
  } catch (error) {
    console.error("Error fetching place name:", error);
  }
};

// Example usage with latitude and longitude
const latitude = 38.9072;
const longitude = -77.0369;

getPlaceName(latitude, longitude);

module.exports = {getPlaceName}
