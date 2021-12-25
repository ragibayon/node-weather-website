const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    // prevent page reloading by from-submitting
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "loading...";
    messageTwo.textContent = "";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = "Location: " + data.location;
                messageTwo.textContent = `It seems ${data.currentWeatherDescriptions[0]} throughout the day! The current temperature is ${data.currentTemperature} \xB0C and the humidity is ${data.currentHumidity}%, but it feels like ${data.currentFeelsLike} \xB0C. The latest observation was made at ${data.latestObservationTime} UTC.`;
            }
        });
    });
});
