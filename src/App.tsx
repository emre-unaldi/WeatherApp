import React from 'react'
import './App.css'
import City from "./components/City";
import Weather from "./components/Weather";
import {useWeather} from "./context/WeatherContext.tsx";
import {useCity} from "./context/CityContext.tsx";
import Weekly from "./components/Weekly";
import Daily from "./components/Daily";
import WeatherDetail from "./components/WeatherDetail";

const App: React.FC = () => {
    const {weathersLoading} = useWeather()
    const {cityLoading} = useCity()

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="container">
                {
                    weathersLoading && cityLoading ? (
                            <div className="card bg-light px-4 py-3">
                                <div className="row">
                                    <div className="col-8 me-3">
                                        <div
                                            className="row mb-3 rounded"
                                            style={{backgroundColor: '#E2E2E2'}}
                                        >
                                            <City/>
                                        </div>
                                        <div
                                            className="row mb-3 rounded"
                                            style={{backgroundColor: '#E2E2E2'}}
                                        >
                                            <Weather/>
                                        </div>
                                        <div
                                            className="row mb-3"
                                        >
                                            <WeatherDetail/>
                                        </div>
                                        <div
                                            className="row rounded"
                                            style={{backgroundColor: '#E2E2E2'}}
                                        >
                                            <Daily/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div
                                            className="row rounded"
                                            style={{backgroundColor: '#E2E2E2'}}
                                        >
                                            <Weekly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                                <h1 className="fw-bold">Loading...</h1>
                                &nbsp;&nbsp;&nbsp;
                                <div className="spinner-border text-dark" />
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default App
