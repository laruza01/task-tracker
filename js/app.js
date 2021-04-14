const setDate = document.querySelector('.date');
const setTime = document.querySelector('.time');
const setGreeting = document.querySelector('.greet');
const setWeather = document.querySelector('.weather');
const setBackground = document.querySelector('.parent');
const setCrypto = document.querySelector('.crypto');


// Create time and set in app
function currentDate() {
    const now = new Date();
    const hours = now.getHours();
    let timeOfDay
  
    //Deterrmine what hour of day and apply appropriate greeting
    if(hours < 12) {
      timeOfDay = "Good morning. Have a lovely day ahead";
    } else if (hours >= 12 && hours < 17) {
      timeOfDay = "Good afternoon. How is your day going?";
    } else {
      timeOfDay = "Good evening. Hope you had a great day at work";
    }
  
    const optionsDate = {
      year: 'numeric', month: 'long', weekday: 'long', day: 'numeric'
    };
    const optionsTime = {
      hour: 'numeric', minute: 'numeric', hour12: true
    };
    const datePart = new Intl.DateTimeFormat('en-US', optionsDate).format(now);
    const timePart = new Intl.DateTimeFormat('en-US', optionsTime).format(now);

    setDate.textContent = datePart;
    setTime.textContent = timePart;
    setGreeting.textContent = timeOfDay;
}
  
setInterval(currentDate, 1000);
  
currentDate();

// Get weather details and set in app
const params = {
  access_key: '93bc5f4cbcdb8c4f36231ff73a76bf23',
  query: 'Lagos'
} 

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
function logError(error) {
  console.log('Looks like there was a problem:', error);
}
function processData(data) {
  setWeather.innerHTML = `<div>
          <div class="weather-icon"><img src="${data.current.weather_icons[0]}" alt="${data.current.weather_descriptions[0]}" ></div>
          <div class="weather-desc">${data.current.weather_descriptions[0]}</div>
          <div class="weather-location">${data.location.region}</div>
          </div>
          <div class="weather-right">
          <span class="weather-temp">${data.current.temperature}</span>
          <span class="weather-o">o</span>
          <span class="weather-type">C</span>
          </div>`
 }
//Get current weather 
function fetchWeather() {
  fetch(`http://api.weatherstack.com/current?access_key=${params.access_key}&query=ogun`)
  .then(validateResponse)
  .then(response => response.json())
  .then(processData)
  .catch(logError);
}

fetchWeather();


//Get background images from unsplash
function fetchBackground(){
  const totalImages = 11;
  let imgId = Math.floor(Math.random() * totalImages);
  fetch(`https://source.unsplash.com/collection/45207359/1920x1200/?sig=${imgId}`)
    .then((response)=> {   
     setBackground.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${response.url}")`;
    })
    .catch((error)=>{console.log('Looks like there was a problem:', error);});
}

setInterval(fetchBackground, 10000);
  
fetchBackground();

const myHeaders = new Headers({
  'X-CoinAPI-Key' : '9D4DEAF6-B580-4D2E-B4DE-5C5E076CD3EC',
  'Accept': 'application/json'

});

//Crypto API for exchange rates
function fetchCrypto(){
  fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
  headers: myHeaders,

  })
    .then( response => response.json() )
    .then( (response)=>{
      console.log(response) 
      console.log(response.asset_id_base)
      console.log(response.src_side_base[0].asset)
      console.log(response.src_side_base[0].rate)
      console.log(response.src_side_base[0].volume)
      setCrypto.innerHTML = `
              <div>
              ${response.asset_id_base}/${response.src_side_base[0].asset} Rate: ${response.src_side_base[0].rate} Volume: ${response.src_side_base[0].volume}
              </div>           
              `
    })
    .catch((error)=>{console.log('Looks like there was a problem:', error);});
}

fetchCrypto();
