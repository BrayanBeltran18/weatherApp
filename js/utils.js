// Funciones de ayuda

// calcular la hora local de la ciudad buscada
export function calculateLocalTime(timezoneOffset) {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = utc + (1000 * timezoneOffset);
    const nd = new Date(cityTime);
    
    // Retornamos un Objeto con dos cosas: el texto ya bonito y la hora numérica real
    return {
        string: nd.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit', hour12: false}),
        hour: nd.getHours() // Esto siempre devuelve un número de 0 a 23, sin fallas
    };
}

// Función debounce para autocompletado
export function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
