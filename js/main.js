import { getWeatherData, getCitySuggestions, getForecast } from './api.js';
import { elements, updateCurrentWeather, updateLocalTime, changeBackgroundByHour, generateRecommendations, renderForecast, renderListUI, renderCitySuggestions, showWeatherResult, hideWeatherResult, showError, hideError } from './ui.js';
import { saveFavorite, removeFavorite, getFavorites, addToHistory, getHistory } from './storage.js';
import { calculateLocalTime, debounce } from './utils.js';

let currentCityName = "";

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadFavorites();
    loadHistory();
    setupEventListeners();
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Formulario de búsqueda
    elements.searchForm.addEventListener('submit', handleSearch);
    
    // Autocompletado con debounce
    elements.cityInput.addEventListener('input', debounce(handleCityInput, 500));
    
    // Botón de favoritos
    elements.addFavoriteBtn.addEventListener('click', handleAddFavorite);
}

// --- HANDLERS ---
async function handleSearch(e) {
    e.preventDefault();
    const city = elements.cityInput.value.trim();
    hideError();
    
    if (!city) {
        showError("Por favor escribe una ciudad.");
        return;
    }
    
    await fetchWeatherData(city);
}

async function handleCityInput(e) {
    const query = e.target.value.trim();
    
    if (query.length > 2) {
        try {
            const cities = await getCitySuggestions(query);
            renderCitySuggestions(cities);
        } catch (error) {
            console.error(error);
        }
    }
}

function handleAddFavorite() {
    if (currentCityName) {
        const wasAdded = saveFavorite(currentCityName);
        if (wasAdded) {
            alert(`¡${currentCityName} agregada a favoritos!`);
            loadFavorites();
        } else {
            alert(`${currentCityName} ya está en favoritos.`);
        }
    }
}

function handleCityClick(city) {
    elements.cityInput.value = city;
    fetchWeatherData(city);
}

function handleRemoveFavorite(city) {
    removeFavorite(city);
    loadFavorites();
}

// --- FUNCIONES PRINCIPALES ---
async function fetchWeatherData(city) {
    try {
        const data = await getWeatherData(city);
        currentCityName = data.name;

        // Actualizar historial automáticamente
        addToHistory(currentCityName);
        loadHistory();

        // Actualizar UI
        updateCurrentWeather(data);
        generateRecommendations(data.weather[0].main);
        
        // Calcular y actualizar hora local
        const timeData = calculateLocalTime(data.timezone);
        updateLocalTime(timeData);
        changeBackgroundByHour(timeData.hour);

        // Obtener pronóstico
        const forecastData = await getForecast(data.coord.lat, data.coord.lon);
        renderForecast(forecastData);

        showWeatherResult();

    } catch (error) {
        showError(error.message);
        hideWeatherResult();
    }
}

function loadFavorites() {
    const favorites = getFavorites();
    renderListUI(favorites, elements.favoritesContainer, true, handleCityClick, handleRemoveFavorite);
}

function loadHistory() {
    const history = getHistory();
    renderListUI(history, elements.historyContainer, false, handleCityClick);
}