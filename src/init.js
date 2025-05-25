const content = document.getElementById("content");
import { render } from "./render";

export const initPage = () => {
  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.placeholder = "Search for a place";
  content.appendChild(searchBar);

  const findButton = document.createElement("button");
  findButton.textContent = "Find";
  content.appendChild(findButton);

  findButton.addEventListener("click", () => {
    const place = searchBar.value;
    getWeather(place);
  });
};

const getWeather = async (place) => {
  const apiKey = "B2Q7QEGY8UGHP7KY4RLHXNEPR";
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  try {
    const response = await fetch(`${baseUrl}${place}?key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    render(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
