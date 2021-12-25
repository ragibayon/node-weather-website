const path = require("path");
const fs = require("fs");
request = require("postman-request");
const filePath = path.join(__dirname, "../secret/.secretWeather");
const weatherAPI = fs.readFileSync(filePath).toString();

// -----------------------------weather-----------------------------------------

const forecast = (latitude, longitude, callback) => {
    const weatherURL =
        `http://api.weatherstack.com/current?` +
        `access_key=${weatherAPI}` +
        `&query=${latitude},${longitude}` +
        `&units=m`;

    request({ uri: weatherURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("unable to connect to internet", undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                currentTemperature: body.current.temperature,
                currentFeelsLike: body.current.feelslike,
                currentWeatherDescriptions: body.current.weather_descriptions,
                currentHumidity: body.current.humidity,
                latestObservationTime: body.current.observation_time,
            });
        }
    });
};

module.exports = forecast;
