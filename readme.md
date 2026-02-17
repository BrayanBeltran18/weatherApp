# 🌦️ WeatherApp

**WeatherApp** es una aplicación web interactiva diseñada para viajeros y curiosos del clima. Permite consultar las condiciones meteorológicas actuales y futuras de cualquier ciudad del mundo, ofreciendo además recomendaciones personalizadas de actividades y mostrando la hora local del destino.

## Características Principales

* **Búsqueda Inteligente:** Buscador con **autocompletado** para encontrar ciudades fácilmente (optimizado con *debounce* para no saturar la API).
* **Datos en Tiempo Real:** Temperatura actual, descripción del clima e iconos representativos.
* **Hora Local Exacta:** Muestra la hora local de la ciudad buscada, calculando la diferencia horaria automáticamente.
* **Ambiente Dinámico:** El fondo de la tarjeta cambia de color según la hora en el destino.
* **Recomendaciones de Viaje:** Sugiere actividades basándose en las condiciones climáticas.
* **Pronóstico de 5 Días:** Visualización clara del clima para los próximos días.
* **Persistencia de Datos:**
    *  **Favoritos:** Guarda tus ciudades preferidas.
    *  **Historial:** Acceso rápido a tus últimas búsquedas.
    * Todo se guarda en el navegador (`LocalStorage`), así que no pierdes tus datos al recargar.

## Tecnologías Utilizadas

El proyecto sigue una arquitectura **Modular (ES6)** para asegurar escalabilidad y limpieza de código:

* **HTML5 Semántico**: Estructura base.
* **Tailwind CSS (vía CDN)**: Diseño responsivo, moderno y estilizado.
* **JavaScript (Vanilla ES6)**: Lógica dividida en módulos:
    * `main.js`: Orquestador principal.
    * `api.js`: Comunicación con OpenWeatherMap API.
    * `ui.js`: Manipulación del DOM y renderizado.
    * `storage.js`: Gestión de LocalStorage.
    * `utils.js`: Funciones de utilidad (tiempo, debounce).
* **API**: [OpenWeatherMap](https://openweathermap.org/) (endpoints de *Current Weather*, *Forecast* y *Geocoding*).

## Requisitos Previos

Para ejecutar este proyecto, necesitas:

1.  Un navegador web moderno (Chrome, Firefox, Edge, en mi caso Brave).
2.  Una conexión a Internet activa (para cargar Tailwind y conectar con la API).
3.  **Importante:** Debido al uso de Módulos de JavaScript (`type="module"`), no puedes abrir el archivo directamente con doble clic. Necesitas un servidor local.

## Instalación y Ejecución

Sigue estos pasos para correr el proyecto en tu máquina:

### Usando Visual Studio Code

1.  **Clona o descarga** este repositorio.
2.  Abre la carpeta del proyecto en **VS Code**.
3.  Instala la extensión **"Live Server"** (por Ritwick Dey).
4.  Haz clic derecho en el archivo `index.html`.
5.  Selecciona **"Open with Live Server"**.
6.  ¡Listo! El proyecto se abrirá automáticamente en tu navegador.

## La demostración la puedes encontrar en:
https://weatherappbcb.netlify.app/

## Estructura del Proyecto
weatherApp/
├── index.html        # Estructura principal
├── README.md         # Documentación
└── js/               # Módulos de JavaScript
    ├── main.js       # Inicialización y eventos
    ├── api.js        # Llamadas a la API
    ├── ui.js         # Funciones de Interfaz (DOM)
    ├── storage.js    # Lógica de guardado
    └── utils.js      # Helpers y utilidades
