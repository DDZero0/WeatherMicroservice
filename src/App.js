import React from 'react';
import './App.css';
import lightRain from './imgs/light_rain.jpg';
import sunny from './imgs/sunny.ico';
import foggy from './imgs/foggy.ico';
import cloudy from './imgs/cloudy.ico';
import defaultImg from './imgs/default.jpg';

class App extends React.Component{
constructor(props){
  super(props);
  this.state={
    visible:'hidden',
    temp: 0,
    high: 0,
    low:0,
    feels:0,
    hum:0,
    sunrise:0,
    sunset:0,
    windspeed:0,
    windgust:0,
    weatherDesc:'',
    weatherImg: '',
    windImg: '',
    sentenceTemp:'',
    sentenceHigh:'',
    sentenceLow:'',

  };

  this.getWeather = this.getWeather.bind();
  this.k2c = this.k2c.bind();
  this.randomArrayNumGen = this.randomArrayNumGen.bind();
}

randomArrayNumGen = (arr) =>{
  let max = arr.length;
  let random = Math.floor(Math.random() * max);
  return random;
}

k2c=(temp)=>{
  return temp - 273.15;
}

getWeather=()=>{

let randomNum = 0;
let sentenceTemp;
let sentenceHigh;
let sentenceLow;
let sentenceHum;
let sentenceWindspeed;
let sentenceWindgust;


let hotDays = [
'Holy sweet fuck, gonna sweat our balls off today.',
'Blisterin\' jesus, if we don\'t melt into the street watch out.',
'This is Newfoundland. TORBAY, Newfoundland. It should never be this hot.',
'I can already smell my flesh, roasting like a suckling pig.',
'Break out the Mankini, this is our time.',
'I\'ve already shaved my head, in a vain attempt to escape the heat.',
'That\'s it, I\'m moving to Antarctica.',
'Newfoundlanders were never designed to endure level of molecular activity.'];
let hotHigh = 'Today will be reaching a goddamn scorcher of ';
let hotLow = 'Mercilessly, it will only be falling off to a mere ';
let feels = 'And just incase you wanted to head out thinking it won\'t be that bad, it\'ll feel like ';
let coldDays = [
  'Jesus Christ if you have balls they\'re going to be inside of you.',
  'I thought hell was supposed to be warm.',
  'I\'m so beyond sick of this cold bullshit like good GOD.',
  'Apparently Torbay has moved closer to the North Pole today.',
  'There isn\'t enough whiskey to save us now.',
  'Snowmen have eyes... to watch.',
  'Frostbite WILL happen if you try to stick your bird on your car and / or snowman/maiden.'
];
let coldHigh = 'Saints be praised, as we will see a high of ';
let coldLow = 'Unfortunately, we\'re also going to be living through the cold grasp of the grave, as the low is ';
let highHum = 'So for those who like it wet, slimey and sticky, your in for a treat, as the humidty is ';
let lowHum = 'Always wanted to visit a desert, but hate sand? You\'re in luck! Today\'s humidty is ';
let highWind = [
  'And sweet jesus is she ever blowing a gale.',
  'Well I hope you nailed down the BBQ.',
  'Sweet jesus Rover is still outside!!',
  'Another 20 grand gone in roof repairs my god.',
  'Good kite weather.'
];
let lowWind = [
  'T\'was but a gentle breeze, sifting the dust particles that is life... speeds are ',
  'Won\'t even blow away a leaf. Well maybe a leaf I didn\'t write this super granually. Wind speed of ',
  'This is why wind power will never work!!! Can\'t turn a turbine with ',
  'Pfffft got the gall to call this windy, just ',
  'I\'ve been bested by stronger winds than you, todays winds. A mere '
];
let highGust = 'It\'ll have DEATH DEFYING gusts of ';
let lowGust = 'It\'ll have meager gusts of ';

  fetch('http://api.openweathermap.org/data/2.5/weather?q=torbay&appid=04eb4a881b881c2491f70f944452b62d')
  .then((response) => {
    return response.json();
  })
  .then((data) => {

  //Weather Variables. Self explanitory really.
    let weatherImg;
    let sunriseTime = new Date(data.sys.sunrise);
    let sunsetTime = new Date(data.sys.sunset);
    sunriseTime = sunriseTime.toLocaleTimeString();
    sunsetTime = sunsetTime.toLocaleTimeString();
    let windGust = (data.wind.gust * 3.6).toFixed(0);

//Icon constructor
    let currentWeather = data.weather[0].description;
    switch (currentWeather) {
    case 'light rain':
    weatherImg = lightRain;
    break;
    case 'light intensity drizzle':
    weatherImg = lightRain;
    break;
    case 'sunny':
    weatherImg = sunny;
    break;
    case 'overcast clouds':
    weatherImg = cloudy;
    break;
    case 'broken clouds':
    weatherImg = cloudy;
    break;
    case 'foggy':
    weatherImg = foggy;
    break;
    default:
    weatherImg = defaultImg;
    break;
  }

//Blurb constructor
  if(this.k2c(data.main.temp).toFixed(2) > 18){
    let ranNum = this.randomArrayNumGen(hotDays);
    sentenceTemp = hotDays[ranNum];
    sentenceHigh = hotHigh;
    sentenceLow = hotLow;
  }
  else{
    let ranNum = this.randomArrayNumGen(coldDays);
    sentenceTemp = coldDays[ranNum];
    sentenceHigh =coldHigh;
    sentenceLow = coldLow;
  }
  if(data.main.humidity > 85){
    sentenceHum = highHum;
  }
  else{
    sentenceHum = lowHum;
  }
  if((data.wind.speed * 3.6).toFixed(0) > 60){
    let ranNum = this.randomArrayNumGen(highWind);
    sentenceWindspeed = highWind[ranNum];
    sentenceWindgust = highGust;
  }
  else{
    let ranNum = this.randomArrayNumGen(lowWind);
    sentenceWindspeed =  lowWind[ranNum];
    sentenceWindgust = lowGust;
  }
  if(windGust == null || windGust == undefined || windGust == 'NaN'){
    sentenceWindgust = 'There will be no gusting today, so ';
    windGust = 0;
  }

//Where the magic happens
    this.setState({
    visible:'visible',
    temp : this.k2c(data.main.temp).toFixed(2),
    high : this.k2c(data.main.temp_max).toFixed(2),
    low : this.k2c(data.main.temp_min).toFixed(2),
    feels : this.k2c(data.main.feels_like).toFixed(2),
    hum : data.main.humidity,
    sunrise : sunriseTime,
    sunset : sunsetTime,
    windspeed : (data.wind.speed * 3.6).toFixed(0),
    windgust : windGust,
    weatherDesc : data.weather[0].description,
    weatherImg: weatherImg,
    sentenceTemp: sentenceTemp,
    sentenceHigh: sentenceHigh,
    sentenceLow: sentenceLow,
    sentenceHum: sentenceHum,
    sentenceWindspeed: sentenceWindspeed,
    sentenceWindgust: sentenceWindgust
  });
})
}

render(){
  return (
    <div className="App">
    <div className="creepy-opener">
    <h3>Do you crave to know what the weather is like in Torbay right now?</h3>
    <h4>Does your body yearn for the humidty percentage?</h4>
    <h5>Do you LUST for the temperature?</h5>
    <h6>Look no further....</h6>
    </div>
    <button onClick={this.getWeather}>Get the weather</button>
    <div className="weather-block" style={{visibility:this.state.visible}}>
    <img id="weatherIcon" src={this.state.weatherImg} alt="weather-img"/>
    <div className="writeup">
    <p>Looks like we got some {this.state.weatherDesc}.{'\n'}
    {this.state.sentenceTemp} It's currently {this.state.temp}C.{'\n'}
    {this.state.sentenceHigh} {this.state.high}C.{'\n'}
    {this.state.sentenceLow} {this.state.low}C.{'\n'}
    And just incase you wanted to head out thinking it won't be that bad, it'll feel like {this.state.feels}C.{'\n'}
    {this.state.sentenceHum}{this.state.hum}%.{'\n'}
    <h4>AND NOW FOR DA JESUS WIND</h4>{'\n'}
    {this.state.sentenceWindspeed} {this.state.windspeed} km/hr, and {this.state.sentenceWindgust} {this.state.windgust} km/hr.{'\n'}
    Finally, a new day will dawn at {this.state.sunrise}, and the great dark begins at {this.state.sunset}</p>
    <div className="weather-words"></div>
    </div>
    </div>
    </div>
  )
}
}

export default App;
