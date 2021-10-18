window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Your browser is out of fashion. There is no geo location!");
  }
};

function success(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  fetch("/data", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ lat: latitude, lon: longitude })
  })
    .then((resp) => {
      resp.json().then((data) => {
        document.getElementById(
          "message"
        ).innerHTML = `<br><br><h4>City: ${data.message.name}</h4><br><h4>Weather: ${data.message.weather[0].main}</h4><br><h4>Temperature: ${data.message.main.temp} degF</h4><br><h4>Feels Like: ${data.message.main.feels_like} degF</h4><br><h4>Pressure: ${data.message.main.pressure} Pascal</h4><br><h4>Humidity: ${data.message.main.humidity} degC</h4><br>`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function error() {
  alert("Can't detect your location. Try again later.");
}
