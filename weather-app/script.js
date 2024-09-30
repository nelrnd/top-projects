const form = document.querySelector("form")
const searchInput = document.querySelector('input[type="search"')

function getWeather(location) {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=WM4EAV8EB7NQ5U7UDZP3DJ63M`
  )
    .then((response) => {
      if (response.status === 400) {
        console.log("zup")
        throw new Error("Chikabang")
      }
    })
    .then((response) => response.json())
    .then((response) => ({
      address: response.resolvedAddress,
      description: response.description,
      temp: response.currentConditions.temp,
    }))
    .catch((err) => console.log(err))
}

;(async function () {
  const weatherData = await getWeather("caprisun")
  console.log(weatherData)
})()

async function handleSearch(event) {
  event.preventDefault()
  if (!searchInput.value) {
    return
  }
  const weatherData = await getWeather(searchInput.value)
}

form.addEventListener("submit", handleSearch)
