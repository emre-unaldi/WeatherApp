import React from "react";
import {capitalizeFirstLetter, useWeather, WeatherData} from "../../context/WeatherContext.tsx";

const Daily: React.FC = () => {
    const {hourlyWeathers} = useWeather()
    const getTime = (str: string): string => {
        const dateTime = new Date(str)
        const hour: number = dateTime.getHours()
        const minute: number = dateTime.getMinutes()

        if (minute < 10) return `${hour} : 0${minute}`

        return `${hour} : ${minute}`
    }

    return (
        <div className="mt-3">
            <p className="h5 fw-bold text-center text-secondary">
                Günlük Hava Tahmini
            </p>
            <div className="row mb-2">
                {
                    hourlyWeathers.map((item: WeatherData, index: number) => (
                        <div key={index} className="col">
                            <div className="row">
                                <div className="text-secondary fw-bold text-center">
                                    {getTime(item.dt_txt)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="text-center">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt="weather-icon"
                                        width={80}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <h5 className="fw-bold text-center">
                                    {`${Math.round(item.main.temp)}°`}
                                </h5>
                            </div>
                            <div className="row">
                                <div className="text-center text-secondary">
                                    {capitalizeFirstLetter(item.weather[0].description)}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Daily