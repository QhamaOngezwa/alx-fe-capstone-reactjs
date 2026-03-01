import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   if (!city.trim()) {
    setError("Please enter a city name");
    return;
    }
       setError(null);
       onSearch(city);
  };

  return (
    <form id="search-city-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
        {error && <p className="error">{error}</p>}
    </form>
  );
}

export default SearchBar;