const apiKey = '6bac67fed78bca4e103b20dd1b87aecd'; // Replace with your OpenWeatherMap API key
const city = 'Ho Chi Minh City'; // Replace with the desired city name

// Make a GET request to the OpenWeatherMap API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},vn&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Extract the relevant weather information
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    // Display the weather information
    console.log(`Temperature: ${temperature} Kelvin`);
    console.log(`Description: ${description}`);
    console.log(`Humidity: ${humidity}%`);
  })
  .catch(error => {
    console.log('Error:', error);
  });