import { useState } from "react";
import "./App.css";

/*
  App.tsx is the main controller of the application.
  It handles:
  - user input
  - API calls
  - loading and error states
*/

function App() {
  // City entered by the user
  const [city, setCity] = useState<string>("");

  // Weather data from the API
  const [weather, setWeather] = useState<any>(null);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Error message
  const [error, setError] = useState<string>("");

  // Fetch weather data from OpenWeatherMap
  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather Buddy</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Search button */}
      <button onClick={fetchWeather}>Search</button>

      {/* Loading message */}
      {loading && <p>Loading weather...</p>}

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Weather result */}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>{getHumanMessage(weather.main.temp)}</p>
        </div>
      )}
    </div>
  );
}

/*
  Converts temperature into a friendly message
*/
function getHumanMessage(temp: number): string {
  if (temp > 30) return "It’s hot — stay hydrated ☀️";
  if (temp < 10) return "It’s cold — dress warmly 🧥";
  return "The weather is pleasant — enjoy your day 🌈";
}

export default App;