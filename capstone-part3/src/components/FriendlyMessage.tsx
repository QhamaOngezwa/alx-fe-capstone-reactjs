interface FriendlyMessageProps {
  weather: {
    main: {
      temp: number;
    };
    weather: {
      main: string;
    }[];
  };
}

function FriendlyMessage({ weather }: FriendlyMessageProps) {
  const temp = weather.main.temp;
  const condition = weather.weather[0].main;

  let message = "";

  if (temp > 30) {
    message = "It’s hot today — stay hydrated 💧";
  } else if (temp < 10) {
    message = "It’s cold — dress warmly 🧥";
  } else {
    message = "The weather feels comfortable 😊";
  }

  if (condition === "Rain") {
    message += " Don’t forget an umbrella ☔";
  }

  return <p>{message}</p>;
}

export default FriendlyMessage;