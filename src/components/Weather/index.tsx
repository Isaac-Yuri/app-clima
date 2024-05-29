import { ChangeEvent, useEffect, useState } from "react";
import LoadingSpin from "../LoadingSpin";
import { BASE_URL_API, API_KEY } from "../../api";
import Map from "/map.svg";
import Search from "/search.svg";
import Humidity from "/humidity.svg";
import Wind from "/wind.svg";

interface IWeatherData {
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
}

function Weather() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [animation, setAnimation] = useState(true);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Seu navegador não permite usar a geolocalização");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        showCityName(coords.longitude, coords.latitude);
      },
      () => {
        alert("Não foi possível obter sua localização");
      }
    );
  };

  const showCityName = async (longitude: number, latitude: number) => {
    const ACCESS_TOKEN =
      "pk.eyJ1IjoiaXNhYWMteXVyaSIsImEiOiJjbHdrbWE0eG8xZHA5MmltamNzYWd3dGs5In0.Tp207B8r-JLg2Ob0URWRHg";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${ACCESS_TOKEN}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const cityName = data.features[2]?.text || "Localização desconhecida";
      setCity(cityName);
    } catch (error) {
      alert("Erro ao buscar o nome da cidade");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleWeatherData = async (city: string) => {
    if (!city) {
      alert("Campo vazio ou nome da cidade incorreto!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL_API}?q=${city}&appid=${API_KEY}&lang=pt_br`
      );

      if (!response.ok) {
        alert("Falha ao buscar dados do clima");
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("Erro ao buscar dados do clima: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClickButton = () => {
    handleWeatherData(city);
  };

  useEffect(() => {
    if (weatherData) {
      const timer = setTimeout(() => {
        setAnimation(false);
        return () => clearTimeout(timer);
      }, 1000);
    }
    setAnimation(true);
  }, [animation, weatherData]);

  return (
    <div className="border-solid border-2 border-[#ffffff33] flex flex-col justify-center items-center p-4 rounded-2xl text-white backdrop-blur-lg bg-[#ffffff19] min-w-[92%] md:min-w-[100%] min-h-16 max-w-full md:max-w-lg lg:max-w-xl">
      <div className="relative w-full h-full flex items-center">
        <img
          className="absolute left-3 w-6 cursor-pointer z-10"
          src={Map}
          id="icon-map"
          alt="Map Icon"
          onClick={getLocation}
        />
        <input
          onChange={handleChange}
          placeholder="Digite aqui uma cidade"
          type="text"
          value={city}
          className="w-full h-full bg-transparent border-2 border-white border-opacity-10 outline-none rounded-lg md:text-xl text-sm text-white font-medium uppercase p-4 px-11 placeholder-white placeholder-capitalize"
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleWeatherData(city);
            }
          }}
        />
        <button
          className="flex justify-center items-center absolute right-0 w-10 h-full bg-transparent border-none outline-none text-2xl px-[15px] md:px-[28px] pl-[5px] cursor-pointer box-border"
          onClick={handleOnClickButton}
        >
          {loading ? (
            <LoadingSpin />
          ) : (
            <img className="absolute h-6 w-6" src={Search} alt="Search Icon" />
          )}
        </button>
      </div>
      {weatherData && (
        <div className="flex flex-col justify-center items-center my-3 md:my-10 w-full">
          <img
            key={weatherData.name}
            src={`${weatherData.weather[0].icon}.png`}
            alt="Ícone do clima"
            className={`w-52 md:w-64 ${animation ? "animate-fade-down" : ""}`}
          />
          <p
            key={`${weatherData.name}-temperature`}
            className={`relative leading-3 font-bold text-4xl my-5 md:text-5xl md:my-7 ${
              animation ? "animate-fade-down" : ""
            }`}
          >
            {(weatherData.main.temp - 273.15).toFixed(2)}
            <span className="absolute text-xl md:text-3xl mx-1 bottom-1">
              °C
            </span>
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 capitalize text-xl md:text-2xl font-semibold text-center">
            <p
              key={`${weatherData.name}-city`}
              className={`${animation ? "animate-fade-right" : ""}`}
            >
              {weatherData.name}:
            </p>
            <p
              key={`${weatherData.name}-description`}
              className={`${animation ? "animate-fade-left" : ""}`}
            >
              {weatherData.weather[0].description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-around my-5 gap-3 md:gap-5 px-20 md:px-0 ">
            <div className="flex justify-start gap-3 md:justify-center">
              <img
                key={`${weatherData.name}-humidity-icon`}
                className={`w-10 md:w-14 ${
                  animation ? "animate-fade-right" : ""
                }`}
                src={Humidity}
                alt="Humidity Icon"
              />
              <div className="leading-6">
                <div
                  key={`${weatherData.name}-humidity-percent`}
                  className="animate-fade-down"
                >
                  {weatherData.main.humidity}%
                </div>
                <p
                  key={`${weatherData.name}-humidity`}
                  className="animate-fade-up"
                >
                  Umidade
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-3 md:justify-center">
              <img
                key={`${weatherData.name}-wind-icon`}
                className={`w-10 md:w-14 ${
                  animation ? "animate-fade-right" : ""
                }`}
                src={Wind}
                alt="Wind Icon"
              />
              <div className="leading-6">
                <div
                  key={`${weatherData.name}-wind-speed`}
                  className="animate-fade-down"
                >
                  {weatherData.wind.speed} km/h
                </div>
                <p key={`${weatherData.name}-wind`} className="animate-fade-up">
                  Velocidade do vento
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
