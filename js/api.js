const API_KEY = '0fb994b62fc5589e7d5afb3fb13952f3';

// Obtener datos del clima actual
export async function getWeatherData(city) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await fetch(urlWeather);
    
    if (!response.ok) throw new Error('Ciudad no encontrada.');
    
    return await response.json();
}

// autocompletado
export async function getCitySuggestions(query) {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    const response = await fetch(geoUrl);
    return await response.json();
}

// Obtener pronóstico días siguientes
export async function getForecast(lat, lon) {
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await fetch(urlForecast);
    return await response.json();
}
