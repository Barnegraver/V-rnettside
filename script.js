let weather = {
    apiKey: "e0d42297422d8c3064fb397b8f6e9f16",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Ingen vær data funnet.");
            throw new Error("Ingen vær data funnet.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".by").innerText = "Været i " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".beskrivelse").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".Fuktighet").innerText =
        "Fuktighet: " + humidity + "%";
      document.querySelector(".Vind").innerText =
        "Vind fart: " + speed + " km/h";
      document.querySelector(".Henter").classList.remove("Informasjon");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Oslo");