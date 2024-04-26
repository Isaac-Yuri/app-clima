import { ChangeEvent, useState } from "react";
import "./style.css";

function Weather() {
  const [city, setCity] = useState("tacima");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  return (
    <div className="card-weather">
      <div className="box-search">
        <div className="box-input">
          <input onChange={handleChange} type="text" value={city} />
        </div>

        <div className="box-button-search">
          <button id="button-search">Pesquisar</button>
        </div>
      </div>
      <div className="box-image-weather">
        <img src="" alt="Ícone do clima" id="image-weather" />
      </div>
      <div className="box-temperature">
        <span id="temperature">30°C</span>
      </div>
      <div className="box-name-city">
        <h1 id="name-city">Tacima</h1>
      </div>
      <div className="box-wind-humidity">
        <div className="box-humidity">Humidity: 50%</div>
        <div className="box-wind">Wind Speed: 2,76 km/h</div>
      </div>
    </div>
  );
}

export default Weather;
