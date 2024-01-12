const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const public = path.join(__dirname, "./Public");
console.log(public);
app.use(express.static(public));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log();
app.get("/", (req, res) => {
  const additionalStyles = "/css/frontPage.css";
  res.render("index", { title: "Your Page Title", style: additionalStyles });
});
const WEATHERKEY = process.env.WEATHERKEY1;
const UNSPLASHKEY = process.env.UNSPLASHKEY1;
console.log(WEATHERKEY, UNSPLASHKEY);
app.all("/cityName/:value?", async (req, res) => {
  console.log(req.params);
  let city = "";
  if (req.params.value !== undefined) {
    // console.log("in");
    city = req.params.value;
  } else {
    // console.log("in1");
    if (req.body.location) {
      city = req.body.location;
    } else {
      // console.log("in3", req.body.search);
      city = req.body.search;
    }
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERKEY}&q=${city}&days=4&aqi=no&alerts=no`
    );
    const data = await response.json();
    const { name, region, country, localtime } = data.location;
    const {
      temp_c,
      condition,
      wind_kph,
      pressure_mb,
      humidity,
      cloud,
      feelslike_c,
    } = data.current;
    let weatherImage = await weatherImg(condition.text);
    console.log(weatherImage);
    const weather = {
      name: name,
      region: region,
      country: country,
      localTime: localtime,
      temp: temp_c,
      condition: condition.text,
      icon: condition.icon,
      wind_kph: wind_kph,
      pressure_mb: pressure_mb,
      humidity: humidity,
      cloud: cloud,
      feelslike_c: feelslike_c,
      weatherImage: weatherImage,
    };
    const additionalStyles = "/css/weather.css";
    res.render("weather", {
      weather: weather,
      title: "weather",
      style: additionalStyles,
    });
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

async function weatherImg(type = "nature") {
  try {
    const imageApi = await fetch(
      `https://api.unsplash.com/photos/random?query=${type}&client_id=${UNSPLASHKEY}`
    );
    const data = await imageApi.json();
    return await data.urls.full;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
app.listen(4000, () => {
  console.log("server is running");
});
