const { default: axios } = require("axios");
(async () => {
  const weatherURL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async () =>
    await axios.get(weatherURL, {
      params: { key: process.env.WEATHER_KEY, q: "auto:ip" },
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

(async () => {
  const newsURL = "https://newsdata.io/api/1/latest";

  const fetchNews = async () =>
    await axios.get(newsURL, {
      params: {
        language: "en",
        apiKey: process.env.NEWS_KEY,
      },
    });

  const formatNews = (data) =>
    data.results.map((result) => [result.title, result.link]);

  const { data } = await fetchNews();

  const articles = formatNews(data);

  document.getElementById("news").innerHTML =
    `<div id="news-content"><h2>News Feed</h2>
  <ul id="news-articles">
  ${articles
    .map(
      (article) => `<li class="article">
    <h3>${article[0]}</h3>
    <a href="${article[1]}">Read more...</a>
    </li>`
    )
    .join(" ")}
  </ul>
  </div>`;
  return;
})();
