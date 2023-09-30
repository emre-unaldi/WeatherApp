import React from "react";
import { WiBarometer, WiHumidity, WiFog } from 'react-icons/wi';
import {useWeather} from "../../context/WeatherContext.tsx";

const WeatherDetail: React.FC = () => {
    const {weathers} = useWeather()

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="col rounded p-3" style={{backgroundColor: '#E2E2E2'}}>
                <div className="row">
                    <div className="col">
                        <div className="text-secondary">Sis :  </div>
                        <div className="fw-bold">
                            {`${weathers[0].visibility / 1000} Km`}
                        </div>
                    </div>
                    <div className="col">
                        <WiFog
                            size={60}
                        />
                    </div>
                </div>
            </div>

            <div className="col rounded p-3 mx-3" style={{backgroundColor: '#E2E2E2'}}>
                <div className="row">
                    <div className="col">
                        <div className="text-secondary">Nem : </div>
                        <div className="fw-bold">
                            {`${weathers[0].main.humidity} %`}
                        </div>
                    </div>
                    <div className="col">
                        <WiHumidity
                            size={60}
                        />
                    </div>
                </div>
            </div>

            <div className="col rounded p-3" style={{backgroundColor: '#E2E2E2'}}>
                <div className="row">
                    <div className="col">
                        <div className="text-secondary">Basınç : </div>
                        <div className="fw-bold">
                            {`${weathers[0].main.pressure} mb`}
                        </div>
                    </div>
                    <div className="col">
                        <WiBarometer
                            size={60}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetail