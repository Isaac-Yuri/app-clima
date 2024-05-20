import { ChangeEvent, useState } from "react";
import { BASE_URL_API, API_KEY } from "../../api";
import "./style.css";
import Map from "/map.svg";
import Search from "/search.svg";
import Humidity from "/humidity.svg";
import Wind from "/wind.svg";

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
        <img src={Map} id="icon-map" alt="" />
        <input
          onChange={handleChange}
          placeholder="Digite aqui uma cidade"
          type="text"
          value={city}
          id="input-search"
        />
        <button>
          <img
            src={Search}
            id="search-button"
            alt=""
            onClick={handleWeatherData}
          />
        </button>
      </div>
      {weatherData && (
        <div className="box-information">
          <img
            src={`${weatherData.weather[0].icon}.png`}
            alt="Ícone do clima"
            id="image-weather"
          />
          <p id="temperature">
            {(weatherData.main.temp - 273.15).toFixed(2)}
            <span>°C</span>
          </p>
          <div className="box-name-and-description">
            <p id="name-city">{weatherData.name}:</p>
            <p id="description">{weatherData.weather[0].description}</p>
          </div>
          <div className="box-wind-humidity">
            <div className="box-humidity">
              <img src={Humidity} alt="" />
              <div className="text">
                <div>{weatherData.main.humidity}%</div>
                <p>Umidade</p>
              </div>
            </div>

            <div className="box-wind">
              <img src={Wind} alt="" />
              <div className="text">
                <div>{weatherData.wind.speed} km/h</div>
                <p>Velocidade do vento</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
