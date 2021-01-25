let form = document.querySelector("#form");
let city = document.querySelector("#city");
let errorDisplay = document.querySelector("#error");
let displayDiv = document.querySelector("#display-div");
let temp = document.querySelector("#temp");
let weather = document.querySelector("#weather");
let cityDisplay = document.querySelector("#cityDisplay");
let icon = document.querySelector("#icon");

let openWeatherMap = {
  key: "729172fe143c7159f66492956582b6a1",
  units: "metric",
  lang: "fr",
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!city.value) {
    errorDisplay.innerHTML = "Please enter a city";
    errorDisplay.style.display = "block";
    return;
  }

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${openWeatherMap.key}&units=${openWeatherMap.units}&lang=${openWeatherMap.lang}`
    )
    .then((response) => {
      errorDisplay.style.display = "none";
      icon.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
      icon.alt = response.data.weather[0].main;
      temp.innerHTML = Math.round(response.data.main.temp);
      weather.innerHTML = response.data.weather[0].description;
      cityDisplay.innerHTML = response.data.name;
      displayDiv.style.display = "block";
      city.value = "";
    })
    .catch((error) => {
      displayDiv.style.display = "none";
      errorDisplay.innerHTML = error.response.data.message;
      errorDisplay.style.display = "block";
    });
});
