export const render = (dataReceive) => {
  const content = document.getElementById("content");
  const weatherDiv = document.querySelector('#content .weather');
  if (weatherDiv) {
    weatherDiv.remove();
  }
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h1>${dataReceive.resolvedAddress}</h1>
    <h2>${dataReceive.description}</h2>
    <h3>Current Temperature: ${dataReceive.currentConditions.temp}</h3>
    <h3>Current Humidity: ${dataReceive.currentConditions.humidity}</h3>
    <h3>Current Wind Speed: ${dataReceive.currentConditions.windspeed}</h3>
    `;
  content.appendChild(weather);
};
