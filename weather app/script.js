async function fetchApi(){
 const cityInput = document.querySelector('.js-city')
 const cityName = cityInput.value.trim();
 if(cityName === ''){return}
document.querySelector('.js-weather').innerHTML = 'Loading...';
try {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
  const place = await response.json();
  if( !place.results || place.results.length === 0){
  document.querySelector('.js-weather').innerHTML = 'the city does not exists';
  return;
  }
  const city = place.results[0];
  const latitude = city.latitude;
  const longitude = city.longitude;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  const weatherResponse = await fetch(weatherUrl);
  if(!weatherResponse.ok){
    throw new Error('something went wrong try again later')
  }
  const weather = await weatherResponse.json();
  document.querySelector('.js-weather').innerHTML = `
  <h2>City: ${city.name}</h2> <br>
  Temperature: ${weather.current.temperature_2m} C <br>
  Humidity: ${weather.current.relative_humidity_2m} % <br>
  Wind: ${weather.current.wind_speed_10m} km/h
  `;
  cityInput.value ='';
} catch (error) {
   document.querySelector('.js-weather').innerHTML =
    'Something went wrong. Try again.';
  console.log(error);
}

}
document.querySelector('.js-search').addEventListener('click', ()=>{
  fetchApi();
});
document.querySelector('.js-city').addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
   fetchApi();
  }
  
});