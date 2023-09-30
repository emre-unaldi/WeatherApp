import React from "react";
import {useWeather, capitalizeFirstLetter} from "../../context/WeatherContext.tsx";

const Weather: React.FC = () => {
    const {weathers} = useWeather()

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="col-4">
                <div className="text-center">
                    <img
                        src={`https://openweathermap.org/img/wn/${weathers[0].weather[0].icon}@2x.png`}
                        alt="weather-icon"
                    />
                </div>
            </div>
            <div className="col-4">
                <h1 className="display-4 fw-bold text-center">
                    {`${Math.round(weathers[0].main.temp)}°`}
                </h1>
            </div>
            <div className="col-4">
                <div className="text-center">
                    <div
                        className="h4"
                    >
                        {capitalizeFirstLetter(weathers[0].weather[0].description)}
                    </div>
                    <div
                        className="h6 text-secondary"
                    >
                        {`Hissedilen : ${Math.round(weathers[0].main.feels_like)}°`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather