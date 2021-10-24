const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    let city = req.body.cityname;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a3e9f654d8503bc06810b44ed628d7af`;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherReport = JSON.parse(data);
            const temp = weatherReport.main.temp;
            res.render("weather-in-city", { city: city, temp: temp });
        });
    });
});

app.listen(2500, function() {
    console.log(`server is running on port 2500`);
});