import React, { useState } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const API_KEY = "3856b67777442241727b3e3f9a82097f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
        setError("");
      } catch (error) {
        setError("This city does not exist, try another one!");
      }
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {error === "" ? null : <Alert error={error} />}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()} C</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>

        {weatherData.name && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {weatherData.main.feels_like.toFixed()} C
                </p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
