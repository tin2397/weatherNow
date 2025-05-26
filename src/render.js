export const render = (dataReceive) => {
  const content = document.getElementById("content");
  const weatherDiv = document.querySelector("#content .weather");
  if (weatherDiv) {
    weatherDiv.remove();
  }
  const weather = document.createElement("div");
  weather.classList.add("weather");

  // Create a state variable to track the current unit
  let isCelsius = true;

  const updateTemperature = () => {
    const temp = dataReceive.currentConditions.temp;
    const displayTemp = isCelsius ? temp : (temp * 9) / 5 + 32;
    const tempElement = weather.querySelector(".temperature");
    tempElement.textContent = `Current Temperature: ${displayTemp.toFixed(1)}°${
      isCelsius ? "C" : "F"
    }`;
  };

  weather.innerHTML = `
    <h1>${dataReceive.resolvedAddress}</h1>
    <h2>${dataReceive.description}</h2>
    <h3 class="temperature">Current Temperature: ${dataReceive.currentConditions.temp}°C</h3>
    <h3>Current Humidity: ${dataReceive.currentConditions.humidity}</h3>
    <h3>Current Wind Speed: ${dataReceive.currentConditions.windspeed}</h3>
    `;

  const cToFButton = document.createElement("button");
  cToFButton.textContent = "Change to Fahrenheit";
  cToFButton.addEventListener("click", () => {
    isCelsius = !isCelsius;
    cToFButton.textContent = `Change to ${
      isCelsius ? "Fahrenheit" : "Celsius"
    }`;
    updateTemperature();
  });

  weather.appendChild(cToFButton);
  content.appendChild(weather);
};
