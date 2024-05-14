import { ChangeEvent, useState } from "react";
import { BASE_URL_API, API_KEY } from "../../api";
import "./style.css";

interface IWeather {
  description: string;
  icon: string;
  main: string;
}
interface IMain {
  temp: number;
  humidity: number;
}

interface IWind {
  speed: number;
}
interface IWeatherData {
  main: IMain;
  weather: IWeather[];
  name: string;
  wind: IWind;
}

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherDada] = useState<IWeatherData>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  async function handleWeatherData() {
    const response = await fetch(
      `${BASE_URL_API}?q=${city}&appid=${API_KEY}&lang=pt_br`
    );
    const data = await response.json();
    setWeatherDada(data);
    console.log(data);
  }

  return (
    <div className="card-weather">
      <div className="box-search">
        <div className="box-input">
          <input onChange={handleChange} type="text" value={city} />
        </div>

        <div className="box-button-search">
          <button id="button-search" onClick={handleWeatherData}>
            Pesquisar
          </button>
        </div>
      </div>
      {weatherData && (
        <div>
          <div className="box-image-weather">
            <img src="01d.png" alt="Ícone do clima" id="image-weather" />
          </div>
          <div className="box-temperature">
            <span id="temperature">{(weatherData.main.temp - 273.15).toFixed(2)}°C</span>
          </div>
          <div className="box-name-city">
            <span id="name-city">{weatherData.name}</span>
          </div>
          <div className="box-wind-humidity">
            <div className="box-humidity">
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className="box-wind">
              Wind Speed: {weatherData.wind.speed} km/h
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
