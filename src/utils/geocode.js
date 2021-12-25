const path = require("path");
const fs = require("fs");
const request = require("postman-request");
const filePath = path.join(__dirname, "../secret/.secretGeocode");
const geocodeAPI = fs.readFileSync(filePath).toString();

const geocode = (address, callback) => {
    const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
        `${encodeURIComponent(address)}.json` +
        `?access_token=${geocodeAPI}` +
        `&limit=1`;

    request({ uri: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("unable to connect to internet", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
