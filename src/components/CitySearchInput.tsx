import { ChangeEvent, Dispatch, SetStateAction } from "react";
import LoadingSpin from "./LoadingSpin";
import Map from "/map.svg";
import Search from "/search.svg";

interface ICitySearchInputProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCity: Dispatch<SetStateAction<string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnClickButton: () => void;
  loading: boolean;
  city: string;
}

const CitySearchInput = ({
  setLoading,
  setCity,
  handleChange,
  handleOnClickButton,
  city,
  loading,
}: ICitySearchInputProps) => {
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
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      const cityName = data.features[2]?.text || "Localização desconhecida";
      setCity(cityName);
    } catch (error) {
      alert("Erro ao buscar o nome da cidade");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default CitySearchInput;
