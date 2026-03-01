import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   if (!city.trim()) {
    setError("Please enter a city name");
    return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;