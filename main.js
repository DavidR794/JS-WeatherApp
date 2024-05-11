//1.API from OpenWeather
const apiKey = "2d09a42ca81c5ef717e80eb6ba016631";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//2b.Search Box functionality
const searchBox = document.querySelector(".search input"); //city name entered into input box
const searchBtn = document.querySelector(".search button"); //click on search icon

//3a. Update Weather
const weatherIcon = document.querySelector(".weather-icon");

//2.Fetching weather data functionality........
//async = fetch data from api which takes time to load,
//param = city, as city will change due to entry by user in search box
async function checkWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    let data = await response.json();

    //5.Invalid city name error, show error and hide weather details.
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      console.log(data); //shows in console all data for weather in city

      //data.name from API object in console.log using the data titles. "Math.round"= rounds up the number
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      //3b.Update weather image:
      // - need to use images in file to change, when the "main" from API object is clouds etc
      // data.weather[0] is from API Object in console where "main"is.
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      } else if (data.weather[0].main == "Wind") {
        weatherIcon.src = "images/wind.png";
      }
      //4.Hide information in card before user enters city name
      // - block shows content
      document.querySelector(".weather").style.display = "block";
      //5a.dont show error when city name is valid
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
//2a.call function to show data in console or in the webapp
// search.value is the city name given in the input which brings now all weather details related to that city
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

/*
Started with:
1.add apikey and apiurl
2.async function check weather, 
2a.calling function using   checkWeather();
2b.searchbox and search button intialisation and functionality
3a.update weather intialisation
3b. update weather images functionality
4.Hide information and only show it when user enters a city, 
- changed css .weather display none to NOT show the weather details
- main.js "block" to SHOW content
5.Invalid city name Error
- added div ,para in search box with class error
- added in css ".error"
- added main.js if-else response 404
5a.dont show error when city name is valid
 */
