import { ChangeEvent, useEffect, useState } from "react";
import CityNotFound from "../CityNotFound";
import { BASE_URL_API, API_KEY } from "../../api";
import Humidity from "/humidity.svg";
import Wind from "/wind.svg";
import CitySearchInput from "../CitySearchInput";

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
  const [cityNotFound, setCityNotFound] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleWeatherData = async (city: string) => {
    if (!city) {
      alert("Campo vazio ou nome da cidade incorreto!");
      return;
    }

    setLoading(true);
    setCityNotFound(false);

    try {
      const response = await fetch(
        `${BASE_URL_API}?q=${city}&appid=${API_KEY}&lang=pt_br`
      );

      if (!response.ok) {
        setCityNotFound(true);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setCityNotFound(true);
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

  useEffect(() => {
    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleWeatherData(city);
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [city]);

  return (
    <div className="border-solid border-2 border-[#ffffff33] flex flex-col justify-center items-center p-4 rounded-2xl text-white backdrop-blur-lg bg-[#ffffff19] min-w-[92%] md:min-w-[100%] min-h-16 max-w-full md:max-w-lg lg:max-w-xl">
      
      <CitySearchInput
        setLoading={setLoading}
        setCity={setCity}
        handleChange={handleChange}
        handleOnClickButton={handleOnClickButton}
        city={city}
        loading={loading}
      />

      {cityNotFound ? (
        <CityNotFound />
      ) : (
        weatherData && (
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
                  <p
                    key={`${weatherData.name}-wind`}
                    className="animate-fade-up"
                  >
                    Velocidade do vento
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Weather;
