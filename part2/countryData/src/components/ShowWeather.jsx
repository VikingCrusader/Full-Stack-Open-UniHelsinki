import { useState, useEffect } from "react";
import axios from "axios";

const ShowWeather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!capital) return;
      const apiKey = import.meta.env.VITE_API_KEY;
      const baseUrl = import.meta.env.VITE_BASE_URL;
      if (!apiKey || !baseUrl) {
        setError("Weather API key or base URL not configured");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${baseUrl}?q=${capital}&appid=${apiKey}`,
        );
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [capital]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return null;

  const tempK = weather?.main?.temp;
  const tempC = typeof tempK === "number" ? Math.round(tempK - 273.15) : "N/A";
  const humidity = weather?.main?.humidity ?? "N/A";
  const wind = weather?.wind?.speed ?? "N/A";

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {tempC}°C</p>
      <p>Weather: {weather?.weather?.[0]?.description ?? "N/A"}</p>
      <img src={`http://openweathermap.org/img/w/${weather?.weather?.[0]?.icon}.png`} alt="Weather icon" width="150" />
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind} m/s</p>
    </div>
  );
};

export default ShowWeather;
