const { default: axios } = require("axios");
(async () => {
  const weatherURL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async () =>
    await axios.get(weatherURL, {
      params: { key: secrets.WEATHER_KEY, q: "auto:ip" },
    });

  const formatWeather = (data) => [
    data.location.region,
    data.location.country,
    data.current.temp_c,
    data.current.condition,
  ];

  const { data } = await fetchWeather();

  const [region, country, temp, conditions] = formatWeather(data);

  document.getElementById("weather").innerHTML = `<div id="weather-content">
    <img src="${conditions.icon}" alt="weather-img" >
  <ul>
  <li>${region}</li>
  <li>${country}</li>
  <li>${temp} degrees celsius</li>
  <li>${conditions.text}</li>
  </ul>
  </div>`;
  return;
})();
