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
    </div>
  );
}

export default Weather;
