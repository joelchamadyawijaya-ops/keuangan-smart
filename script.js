// ==================== CONFIGURATION ====================
const API_KEY = 'ebd0ad2da64cc34e25872d98a47e65e8'; // Free OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org';

// ==================== DOM ELEMENTS ====================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const welcomeSection = document.getElementById('welcomeSection');
const mainContent = document.getElementById('mainContent');

// Current Weather Elements
const cityName = document.getElementById('cityName');
const dateTime = document.getElementById('dateTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');

// Forecast Elements
const hourlyForecast = document.getElementById('hourlyForecast');
const fiveDayForecast = document.getElementById('fiveDayForecast');

// Additional Info
const uvIndex = document.getElementById('uvIndex');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// ==================== EVENT LISTENERS ====================
searchBtn.addEventListener('click', searchWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});
locationBtn.addEventListener('click', getLocationWeather);

// ==================== MAIN FUNCTIONS ====================

/**
 * Search weather by city name
 */
function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Silakan masukkan nama kota!');
        return;
    }
    fetchWeatherByCity(city);
}

/**
 * Get weather by geolocation
 */
function getLocationWeather() {
    showLoading();
    clearError();

    if (!navigator.geolocation) {
        showError('Geolocation tidak didukung oleh browser Anda');
        hideLoading();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showError('Tidak dapat mengakses lokasi Anda: ' + error.message);
            hideLoading();
        }
    );
}

/**
 * Fetch weather data by city name
 */
async function fetchWeatherByCity(city) {
    showLoading();
    clearError();

    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            showError('Kota tidak ditemukan. Silakan coba nama lain.');
            hideLoading();
            return;
        }

        const { lat, lon, name, country } = geoData[0];
        searchInput.value = '';
        
        // Fetch weather data
        await fetchWeatherByCoordinates(lat, lon, name, country);
    } catch (error) {
        showError('Gagal mengambil data cuaca: ' + error.message);
        hideLoading();
    }
}

/**
 * Fetch weather data by coordinates
 */
async function fetchWeatherByCoordinates(lat, lon, cityNameOverride = null, countryOverride = null) {
    showLoading();
    clearError();

    try {
        // Fetch current weather and forecast
        const response = await fetch(
            `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Reverse geocode to get city name if not provided
        if (!cityNameOverride) {
            try {
                const reverseGeoResponse = await fetch(
                    `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
                );
                const reverseGeoData = await reverseGeoResponse.json();
                if (reverseGeoData.length) {
                    cityNameOverride = reverseGeoData[0].name;
                    countryOverride = reverseGeoData[0].country;
                }
            } catch (e) {
                console.log('Reverse geocoding failed, using coordinates');
            }
        }

        // Update UI with weather data
        updateCurrentWeather(data.current, cityNameOverride, countryOverride);
        updateHourlyForecast(data.hourly);
        updateDailyForecast(data.daily);
        updateAdditionalInfo(data.current, data.daily[0]);

        hideLoading();
        showMainContent();
    } catch (error) {
        showError('Gagal mengambil data cuaca: ' + error.message);
        hideLoading();
    }
}

/**
 * Update current weather display
 */
function updateCurrentWeather(current, cityNameOverride = null, countryOverride = null) {
    const cityDisplay = cityNameOverride 
        ? `${cityNameOverride}${countryOverride ? ', ' + countryOverride : ''}` 
        : 'Lokasi Saat Ini';
    
    cityName.textContent = cityDisplay;
    
    // Date and time
    const now = new Date();
    dateTime.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Weather icon
    const iconCode = current.weather[0].icon;
    weatherIcon.className = getWeatherIcon(iconCode);

    // Temperature and description
    temperature.textContent = Math.round(current.temp);
    weatherDescription.textContent = current.weather[0].description;

    // Details
    humidity.textContent = current.humidity + '%';
    windSpeed.textContent = (current.wind_speed * 3.6).toFixed(1) + ' km/h';
    pressure.textContent = current.pressure + ' mb';
    visibility.textContent = (current.visibility / 1000).toFixed(1) + ' km';
}

/**
 * Update hourly forecast
 */
function updateHourlyForecast(hourlyData) {
    hourlyForecast.innerHTML = '';
    
    // Show next 24 hours
    hourlyData.slice(0, 24).forEach(hour => {
        const date = new Date(hour.dt * 1000);
        const time = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const icon = getWeatherIcon(hour.weather[0].icon);
        const temp = Math.round(hour.temp);

        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-icon">
                <i class="${icon}"></i>
            </div>
            <div class="hourly-temp">${temp}°C</div>
            <div class="hourly-desc">${hour.weather[0].main}</div>
        `;
        hourlyForecast.appendChild(card);
    });
}

/**
 * Update 5-day forecast
 */
function updateDailyForecast(dailyData) {
    fiveDayForecast.innerHTML = '';
    
    // Show next 5 days (skip first day as it's today)
    dailyData.slice(1, 6).forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
        const icon = getWeatherIcon(day.weather[0].icon);
        const tempMax = Math.round(day.temp.max);
        const tempMin = Math.round(day.temp.min);

        const card = document.createElement('div');
        card.className = 'day-card';
        card.innerHTML = `
            <div class="day-name">${dayName}</div>
            <div class="day-date">${dayDate}</div>
            <div class="day-icon">
                <i class="${icon}"></i>
            </div>
            <div class="day-temps">
                <span class="day-temp-max">${tempMax}°</span>
                <span class="day-temp-min">${tempMin}°</span>
            </div>
            <div class="day-description">${day.weather[0].main}</div>
        `;
        fiveDayForecast.appendChild(card);
    });
}

/**
 * Update additional information
 */
function updateAdditionalInfo(current, dayData) {
    // UV Index
    uvIndex.textContent = Math.round(current.uvi || 0);

    // Sunrise and Sunset
    const sunrise_date = new Date(current.sunrise * 1000);
    const sunset_date = new Date(current.sunset * 1000);
    
    sunrise.textContent = sunrise_date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    sunset.textContent = sunset_date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

/**
 * Get FontAwesome icon based on weather code
 */
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-rain',
        '09n': 'fas fa-cloud-rain',
        '10d': 'fas fa-cloud-sun-rain',
        '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-water',
        '50n': 'fas fa-water'
    };
    return iconMap[iconCode] || 'fas fa-cloud';
}

// ==================== UI HELPER FUNCTIONS ====================

/**
 * Show loading spinner
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    mainContent.classList.add('hidden');
    welcomeSection.classList.add('hidden');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Show main content
 */
function showMainContent() {
    mainContent.classList.remove('hidden');
    welcomeSection.classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather Dashboard berhasil dimuat!');
    // Optional: Auto-load weather for default location
    // fetchWeatherByCity('Jakarta');
});
