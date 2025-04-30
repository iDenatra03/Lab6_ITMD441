// scripts.js

const locationSelect = document.getElementById("locationSelect");
const todayData = document.getElementById("todayData");
const tomorrowData = document.getElementById("tomorrowData");

locationSelect.addEventListener("change", () => {
  const coords = locationSelect.value;
  if (!coords) return;
  const [lat, lon] = coords.split(",");

  fetchData(lat, lon, "today", todayData);
  fetchData(lat, lon, "tomorrow", tomorrowData);
});

function fetchData(lat, lon, date, targetElement) {
  const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=${date}`;

  targetElement.innerHTML = "<p>Loading...</p>";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.results) {
        targetElement.innerHTML = "<p>Error: No data available.</p>";
        return;
      }
      const r = data.results;
      targetElement.innerHTML = `
        <ul>
          <li><strong>Sunrise:</strong> ${r.sunrise}</li>
          <li><strong>Sunset:</strong> ${r.sunset}</li>
          <li><strong>Dawn:</strong> ${r.dawn}</li>
          <li><strong>Dusk:</strong> ${r.dusk}</li>
          <li><strong>Day Length:</strong> ${r.day_length}</li>
          <li><strong>Solar Noon:</strong> ${r.solar_noon}</li>
          <li><strong>Time Zone:</strong> ${r.timezone}</li>
        </ul>
      `;
    })
    .catch((err) => {
      targetElement.innerHTML = "<p>Error fetching data.</p>";
      console.error(err);
    });
}

