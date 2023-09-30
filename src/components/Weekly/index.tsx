import React from "react";
import {capitalizeFirstLetter, useWeather, WeatherData} from "../../context/WeatherContext.tsx";

const Weekly: React.FC = () => {
    const {weathers} = useWeather()
    const getDate = (str: string): string => {
        const date: Date = new Date(str)
        return date.toLocaleString("TR-tr", {weekday: "long"})
    }

    return (
        <div className="mt-4">
            <p className="h5 fw-bold text-center text-secondary">
                5 Günlük Hava Tahmini
            </p>
            {
                weathers.map((item: WeatherData, index: number) => (
                    <div key={index} className="mb-3">
                        <div className="row">
                            <div className="d-flex justify-content-center align-items-center">

                                <div className="col-3">
                                    <span className="text-secondary">
                                        {getDate(item.dt_txt)}
                                    </span>
                                </div>

                                <div className="col-3">
                                    <div className="text-center">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt="weather-icon"
                                            width={80}
                                        />
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div className="text-center text-secondary">
                                        {capitalizeFirstLetter(item.weather[0].description)}
                                    </div>
                                </div>

                                <div className="col-3">
                                    <h3 className="fw-bold text-center">
                                        {`${Math.round(item.main.temp)}°`}
                                    </h3>
                                </div>

                            </div>
                        </div>
                        {index !== 4 ? <hr/> : null}
                    </div>
                ))
            }
        </div>
    )
}

export default Weekly