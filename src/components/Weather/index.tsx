import { ChangeEvent, useState } from "react";
import { BASE_URL_API, API_KEY } from "../../api";
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
    <div className="border-solid border-2 border-[#ffffff33] flex flex-col justify-center items-center p-4 rounded-2xl text-white backdrop-blur-lg bg-[#ffffff19] min-w-96 min-h-16">
      <div className="relative w-full h-full flex items-center">
        <img
          className="absolute left-3 w-6 cursor-pointer z-10"
          src={Map}
          id="icon-map"
          alt=""
        />
        <input
          onChange={handleChange}
          placeholder="Digite aqui uma cidade"
          type="text"
          value={city}
          className="w-full h-full bg-transparent border-2 border-white border-opacity-10 outline-none rounded-lg text-lg text-white font-medium uppercase p-4 px-10 placeholder-white placeholder-capitalize"
        />
        <button className="flex justify-center items-center absolute right-0 w-10 h-full bg-transparent border-none outline-none text-2xl px-[30px] pl-[5px] cursor-pointer box-border">
          <img
            className="absolute h-6 w-6"
            src={Search}
            alt=""
            onClick={handleWeatherData}
          />
        </button>
      </div>
      {weatherData && (
        <div className="flex flex-col justify-center items-center my-10">
          <img
            src={`${weatherData.weather[0].icon}.png`}
            alt="Ícone do clima"
            className="w-64"
          />
          <p className="relative leading-3 font-bold text-5xl my-7">
            {(weatherData.main.temp - 273.15).toFixed(2)}
            <span
              className="absolute text-3xl mx-1 bottom-1
            "
            >
              °C
            </span>
          </p>
          <div className="flex gap-6 capitalize text-2xl font-semibold">
            <p>{weatherData.name}:</p>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className="flex w-full justify-around my-5 gap-5">
            <div className="flex justify-center items-center gap-3">
              <img className="w-14" src={Humidity} alt="" />
              <div className="leading-6">
                <div>{weatherData.main.humidity}%</div>
                <p>Umidade</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <img className="w-14" src={Wind} alt="" />
              <div className="leading-6">
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
