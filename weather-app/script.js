const options = { tempUnit: "celcius" }
let weatherData

const form = document.querySelector("form")
const searchInput = document.querySelector('input[type="search"')
const content = document.getElementById("content")
const tempBtn = document.getElementById("temp-btn")

async function getWeather(location) {
  try {
    displayLoading()
    weatherData = null
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=WM4EAV8EB7NQ5U7UDZP3DJ63M`
    )
    if (!response.ok) {
      throw new Error("Something went wrong with the request")
    }
    const data = await response.json()
    return {
      address: data.resolvedAddress,
      description: data.description,
      temp: data.currentConditions.temp,
      condition: data.currentConditions.icon,
    }
  } catch (err) {
    console.log(err)
    displayError()
  }
}

function displayLoading() {
  content.textContent = "Loading..."
}

function displayError() {
  content.textContent = "Something went wrong with your request! :("
}

function displayWeather(weatherData) {
  const addressElem = document.createElement("p")
  const descriptionElem = document.createElement("p")
  const tempElem = document.createElement("p")
  const imgElem = document.createElement("img")

  addressElem.innerHTML = weatherData.address.replaceAll(", ", ", <br>")
  descriptionElem.textContent = weatherData.description
  tempElem.textContent = getFormattedTemp(weatherData.temp, options.tempUnit)
  imgElem.alt = weatherData.condition

  switch (weatherData.condition) {
    case "snow":
      imgElem.src = "./assets/snow.png"
      break
    case "rain":
      imgElem.src = "./assets/rain.png"
      break
    case "wind":
      imgElem.src = "./assets/wind.png"
      break
    case "fog":
    case "cloudy":
      imgElem.src = "./assets/cloudy.png"
      break
    case "partly-cloudy-day":
      imgElem.src = "./assets/partly-cloudy-day.png"
      break
    case "partly-cloudy-night":
      imgElem.src = "./assets/partly-cloudy-night.png"
      break
    case "clear-day":
      imgElem.src = "./assets/clear-day.png"
      break
    case "clear-night":
      imgElem.src = "./assets/clear-night.png"
      break
    default:
      console.log("Unknown condition")
  }

  content.innerHTML = null
  content.appendChild(addressElem)
  content.appendChild(descriptionElem)
  content.appendChild(tempElem)
  content.appendChild(imgElem)
}

function getFormattedTemp(temp, unit) {
  switch (unit) {
    case "fahrenheit":
      return Math.round(temp) + "°F"
    case "celcius":
      return Math.round(((temp - 32) * 5) / 9) + "°C"
  }
}

async function handleSearch(event) {
  event.preventDefault()
  if (!searchInput.value) {
    return
  }
  weatherData = await getWeather(searchInput.value)
  displayWeather(weatherData)
  form.reset()
  searchInput.focus()
}

function changeTempUnit() {
  if (options.tempUnit === "celcius") {
    options.tempUnit = "fahrenheit"
    tempBtn.textContent = "Display in °C"
  } else {
    options.tempUnit = "celcius"
    tempBtn.textContent = "Display in °F"
  }
  if (weatherData) {
    displayWeather(weatherData)
  }
}

form.addEventListener("submit", handleSearch)
tempBtn.addEventListener("click", changeTempUnit)
