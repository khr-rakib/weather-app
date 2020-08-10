const DEFAULT_CITY = 'dhaka,bd'
const API_KEY = '1e5d18515761dbcb4941a25907b98062'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = 'https://openweathermap.org/img/w/'

const img = document.getElementById('img')
const name = document.getElementById('name')
const country = document.getElementById('country')
const mainText = document.getElementById('mainText')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')

const textInput = document.getElementById('textInput')


// get weather data
function getWeatherData(city = DEFAULT_CITY, coords){
    let url = BASE_URL
    
    city === null ? 
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` : 
        url = `${url}&q=${city}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        let weather = {
            icon: data.weather[0].icon,
            name: data.name,
            country: data.sys.country,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity
        }

        setWeatherDOM(weather)
    })
    .catch(e => alert('wrong city name !!!'))
}



// set weather in DOM
function setWeatherDOM(weather){
    img.src = `${ICON_URL}${weather.icon}.png`
    name.innerText = weather.name
    country.innerText = weather.country
    mainText.innerText = weather.description
    temp.innerText = weather.temp
    pressure.innerText = weather.pressure
    humidity.innerText = weather.humidity

}

// window event 
window.onload = function () {
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    }, e => {
        getWeatherData()
    })
 
 
    // submit input city
    textInput.addEventListener('keypress', (e) => {
        if(e.key == 'Enter'){
            if(e.target.value){
                const textInputValue = textInput.value
                getWeatherData(textInputValue)
                e.target.value = ''
            }else {
                alert('Please Enter a Valid City Name !!!')
            }
        }         
    })
}