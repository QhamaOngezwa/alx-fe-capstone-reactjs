import { useState } from react

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b427fed952a6f0fafd05d6392d42f197`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather Forecast ☁️</h1>

      <SearchBar onSearch={fetchWeather} />

      {loading && <p>Loading weather...</p>}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;