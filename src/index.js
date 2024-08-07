const { default: axios } = require("axios");

async function createWeatherComponent() {
  const fetchWeather = async () => {

      const data = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: { key: process.env.WEATHER_KEY, q: "auto:ip" },
        }
      );
      return formatWeather(data.data);
  };

  const formatWeather = (data) => {
    const [region, country] = [data.location.region, data.location.country];
    const [temp, conditions] = [data.current.temp_c, data.current.condition];

    return [region, country, temp, conditions];
  };

  const [region, country, temp,conditions] = await fetchWeather();

  document.getElementById("weather").innerHTML=(`<div id="weather-content">
    <img src="${conditions.icon}" alt="weather-img" >
  <ul>
  <li>${region}</li>
  <li>${country}</li>
  <li>${temp} degrees celsius</li>
  <li>${conditions.text}</li>
  </ul>
  </div>`);
  return;
}

createWeatherComponent();
