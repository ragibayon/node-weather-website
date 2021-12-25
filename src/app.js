const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup handlebars and vies
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Ragib Shahariar Ayon",
    }); // express renders from views to html (name of file, values to pass)
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ragib Shahariar Ayon",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help me!",
        name: "Ragib Shahariar Ayon",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is not given",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                }

                res.send({
                    location: location,
                    currentWeatherDescriptions:
                        forecastData.currentWeatherDescriptions,
                    currentTemperature: forecastData.currentTemperature,
                    currentFeelsLike: forecastData.currentFeelsLike,
                    currentHumidity: forecastData.currentHumidity,
                    latestObservationTime: forecastData.latestObservationTime,
                });
            });
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ragib Shahariar Ayon",
        errorMessage: "Content not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ragib Shahariar Ayon",
        errorMessage: "Page not found",
    });
});

// port to listen to
app.listen(port, () => {
    console.log("server is up on port " + port);
});
