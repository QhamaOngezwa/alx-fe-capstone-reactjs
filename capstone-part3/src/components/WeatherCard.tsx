interface WeatherCardProps {
  weather: {
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
  };
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>

      <HumanMessage weather={weather} />
    </div>
  );
}

export default WeatherCard;