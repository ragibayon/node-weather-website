const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = "loading...";
    messageTwo.textContent = "";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = "Location: " + data.location;
                messageTwo.textContent = `It seems ${data.weather_description[0].toLowerCase()} throughout the day! The current temperature is ${
                    data.current_temperature
                } degree celsius, but is feels like ${
                    data.feels_like
                } degree celsius.`;
            }
        });
    });
});
