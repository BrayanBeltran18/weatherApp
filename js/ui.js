// --- UI.JS - Solo manipula el DOM (pinta HTML, cambia colores) ---

// Elementos del DOM
export const elements = {
    searchForm: document.getElementById('search-form'),
    weatherCard: document.getElementById('weather-card'),
    cityInput: document.getElementById('city-input'),
    cityList: document.getElementById('city-suggestions'),
    errorMsg: document.getElementById('error-message'),
    weatherResult: document.getElementById('weather-result'),
    
    // UI Clima
    cityNameEl: document.getElementById('city-name'),
    localTimeEl: document.getElementById('local-time'),
    weatherIconEl: document.getElementById('weather-icon'),
    tempEl: document.getElementById('temperature'),
    descEl: document.getElementById('description'),
    
    // UI Recomendaciones y Pronóstico
    recTextEl: document.getElementById('recommendation-text'),
    activityListEl: document.getElementById('activity-list'),
    forecastContainer: document.getElementById('forecast-container'),
    
    // UI Listas (Favoritos e Historial)
    favoritesContainer: document.getElementById('favorites-container'),
    historyContainer: document.getElementById('history-container'),
    addFavoriteBtn: document.getElementById('add-favorite-btn')
};

// Actualizar clima actual en la UI
export function updateCurrentWeather(data) {
    elements.cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    elements.tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    elements.descEl.textContent = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    elements.weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Actualizar hora local
export function updateLocalTime(timeData) {
    elements.localTimeEl.textContent = `Hora local: ${timeData.string}`;
}

// Cambiar fondo según la hora
export function changeBackgroundByHour(hour) {
    elements.weatherCard.className = "bg-gradient-to-br text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center relative transition-colors duration-1000";

    if (hour >= 6 && hour < 17) {
        // DÍA: De las 6 AM a las 4:59 PM (Azul brillante)
        elements.weatherCard.classList.add('from-cyan-400', 'to-blue-500');
    } else if (hour >= 17 && hour < 20) {
        // ATARDECER: De las 5 PM a las 7:59 PM (Naranja/Rosa)
        elements.weatherCard.classList.add('from-orange-400', 'to-pink-600');
    } else {
        // NOCHE: De las 8 PM a las 5:59 AM (Azul oscuro/Gris)
        elements.weatherCard.classList.add('from-slate-900', 'to-purple-900');
    }
}

// Generar recomendaciones según el clima
export function generateRecommendations(weatherMain) {
    elements.activityListEl.innerHTML = '';
    let activities = [];
    let message = '';

    switch (weatherMain) {
        case 'Clear':
            message = "Cielo despejado, ni una sola nube";
            activities = ["Ir a la playa", "Picnic", "Ir a subir un cerro","Usa paraguas para el sol","Toma un café"];
            break;
        case 'Clouds':
            message = "Nublado pero agradable.";
            activities = ["Sal a caminar", "Ve a un tianguis", "Ve a tomarte unas fotitos","Toma un café"];
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            message = "Lluvia. Tocan planes bajo techo.";
            activities = ["Quedate en casa", "Cine", "Cafetería","Llévate un paraguas","Duerme toda la tarde","Toma un café"];
            break;
        case 'Snow':
            message = "Está nevando.";
            activities = ["Ve a esquiar", "Haz un muñeco de nieve", "Toma un chocolate caliente","Tira una bola de nieve a alguien","Toma un café"];
            break;
        default:
            message = "Clima variado.";
            activities = ["Explorar el centro","Toma un café"];
    }
    
    elements.recTextEl.textContent = message;
    activities.forEach(act => {
        const li = document.createElement('li');
        li.textContent = act;
        elements.activityListEl.appendChild(li);
    });
}

// Renderizar pronóstico
export function renderForecast(data) {
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
    elements.forecastContainer.innerHTML = '';

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const card = document.createElement('div');
        card.className = "bg-blue-100 p-4 rounded-lg flex flex-col items-center shadow-sm";
        card.innerHTML = `
            <p class="font-bold text-gray-700 capitalize">${date}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" class="w-10 h-10">
            <p class="text-lg font-bold text-blue-600">${temp}°C</p>
        `;
        elements.forecastContainer.appendChild(card);
    });
}

// Renderizar listas (favoritos/historial)
export function renderListUI(list, container, canDelete = false, onCityClick, onDeleteClick) {
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<p class="text-xs text-gray-400 italic">Vacío</p>';
        return;
    }

    list.forEach(city => {
        const pill = document.createElement('div');
        pill.className = "inline-flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2 shadow-sm transition hover:bg-gray-300";

        const cityText = document.createElement('span');
        cityText.textContent = city;
        cityText.className = "text-xs font-semibold text-gray-700 cursor-pointer mr-2";
        cityText.addEventListener('click', () => onCityClick(city));

        pill.appendChild(cityText);

        if (canDelete) {
            const deleteBtn = document.createElement('span');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.className = "text-red-500 hover:text-red-700 font-bold cursor-pointer ml-1 text-lg leading-none";
            deleteBtn.title = "Eliminar de favoritos";
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onDeleteClick(city);
            });

            pill.appendChild(deleteBtn);
        }

        container.appendChild(pill);
    });
}

// Renderizar sugerencias de ciudades
export function renderCitySuggestions(cities) {
    elements.cityList.innerHTML = '';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.name}, ${city.country}`;
        elements.cityList.appendChild(option);
    });
}

// Mostrar/ocultar elementos
export function showWeatherResult() {
    elements.weatherResult.classList.remove('hidden');
    elements.errorMsg.classList.add('hidden');
}

export function hideWeatherResult() {
    elements.weatherResult.classList.add('hidden');
}

export function showError(message) {
    elements.errorMsg.textContent = message;
    elements.errorMsg.classList.remove('hidden');
}

export function hideError() {
    elements.errorMsg.classList.add('hidden');
}
