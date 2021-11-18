const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

function cap(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }
  
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
    
});

  
app.post("/", function(req, res){
    const query = req.body.cityName;
  const apiKey = "bdf1f48747ef3b3b149614cea06ea56b";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData =  JSON.parse(data);
      const temp = weatherData.main.temp;
      const tempFeelsLike = weatherData.main.feels_like;
      const discription = weatherData.weather[0].description;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const tempMin = weatherData.main.temp_min;
      const tempMax = weatherData.main.temp_max;
      const icon = weatherData.weather[0].icon;
      const weatherImage = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weather forecast</title>
          <link rel="icon" type="image/x-icon" href="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/internet-web-browser-128.png">
          <link rel="stylesheet" href="css/style2.css">
          <script src="https://kit.fontawesome.com/7215ecbee3.js" crossorigin="anonymous"></script>
      </head>
      <body>
       <div class="container">
           <div class="box1">
      <div class="img-box">       
      <div class="heading"><h2>Current Weather in ${cap(query)}</h2></div>
      <div class="weather">
      <img src="${weatherImage}" alt="" class=" weather-image">
          <div class="celcs"><p>${Math.round(temp)}°C</p></div></div>
          <div class="des"><p> feels like ${Math.round(tempFeelsLike)}°C,<br> ${discription}</p></div>
          
      </div>
          <div class="content-box">
      <p class="humidity pading"><i class="fas fa-tint fa-2x icon"></i>&nbsp; Humidity: ${humidity}%</p>
      <p class="wind pading"><i class="fas fa-wind fa-2x icon "></i>&nbsp;Wind Speed: ${windSpeed}km/h</p>
      <p class="max pading"><i class="fas fa-temperature-high fa-2x icon"></i>&nbsp;Max. tempreture: ${tempMax}°C</p>
      <p class="min pading"><i class="fas fa-temperature-low fa-2x icon"></i>&nbsp;Min. tempreture: ${tempMin}°C</p>
          </div>
          <form action="/" method="get">
              <center><button class="button-search" type="submit">Search Again!</button></center>
             </form>
           </div>
           
           <div id="background-wrap">
              <div class="x1">
                  <div class="cloud"></div>
              </div>
          
              <div class="x2">
                  <div class="cloud"></div>
              </div>
          
              <div class="x3">
                  <div class="cloud"></div>
              </div>
          
              <div class="x4">
                  <div class="cloud"></div>
              </div>
          
              <div class="x5">
                  <div class="cloud"></div>
              </div>
          </div>
          
       </div>
      </body>
      </html>`);
      res.send();

    });
  });
});


app.listen(process.env.PORT || 3000 , function(){
     console.log("server is running on port 3000");
});