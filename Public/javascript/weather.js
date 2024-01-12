document.addEventListener("DOMContentLoaded", function () {
  // Fetch the weather image URL from the server-rendered HTML
  const weatherImageURL = document
    .getElementById("weatherImage")
    .getAttribute("src");

  // Set the background image for the element with the ID "box"
  const boxElement = document.getElementById("box");
  boxElement.style.backgroundImage = `url('${weatherImageURL}')`;
});
if ("geolocation" in navigator) {
  const locationIcon = document.getElementById("currentLocation");
  const locationInput = document.getElementById("location");
  locationIcon.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        locationInput.value = `${latitude},${longitude}`;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        document.querySelector("form").submit();
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      }
    );
  });
} else {
  console.error("Geolocation is not supported by your browser");
}

const submitButton = document.getElementById("submitBtn");
const search = document.getElementById("search");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (search.value.trim() == "") {
    alert("please fill the field");
  } else {
    document.querySelector("form").submit();
  }
});
