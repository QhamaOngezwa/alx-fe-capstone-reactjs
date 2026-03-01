import { useState } from "react";


interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b427fed952a6f0fafd05d6392d42f197`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Could not find that city");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Forecast ☁️</h1>

      <SearchBar onSearch={fetchWeather} />

      {loading && <p>Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;