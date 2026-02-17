// --- STORAGE.JS - Solo guarda/carga de LocalStorage ---

const FAVORITES_KEY = 'weatherAppFavorites';
const HISTORY_KEY = 'weatherAppHistory';

// FAVORITOS
export function saveFavorite(city) {
    let favorites = getFavorites();
    
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true; // Se agregó exitosamente
    }
    return false; // Ya existía
}

export function removeFavorite(city) {
    let favorites = getFavorites();
    favorites = favorites.filter(item => item !== city);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

// HISTORIAL
export function addToHistory(city) {
    let history = getHistory();

    // Lógica para no repetir y poner al inicio
    history = history.filter(item => item !== city);
    history.unshift(city);
    if (history.length > 5) history.pop();

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
}

export function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}
