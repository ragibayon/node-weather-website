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
        helpText: "May Allah bless us all.",
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
                console.log(error);
                return res.send({
                    error: error,
                });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error);
                    return res.send({
                        error: error,
                    });
                }

                res.send({
                    location: location,
                    weather_description:
                        forecastData.currentWeatherDescriptions,
                    current_temperature: forecastData.currentTemperature,
                    feels_like: forecastData.currentFeelsLike,
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

// port ato listen to
app.listen(3000, () => {
    console.log("server is up on port 3000");
});
