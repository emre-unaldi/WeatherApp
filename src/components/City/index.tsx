import React from "react";
import {CityData, useCity} from "../../context/CityContext.tsx";
import {Coordinates, useWeather} from "../../context/WeatherContext.tsx";

const City: React.FC = () => {
    const {city, selected, setSelected} = useCity()
    const {setCoordinates} = useWeather()
    const handleSelectedCity = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const cityName: string = event.target.value
        setSelected(cityName)

        const selectedCity: CityData | undefined = city
            .find((item: CityData): boolean => item.name === cityName)

        if (selectedCity) {
            setCoordinates(selectedCity.coordinates as Coordinates)
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center">
            <div className="col-6">
                <div>
                    <h1 className="text-center">
                        {selected}
                    </h1>
                </div>
            </div>
            <div className="col-6">
                <div
                    className="d-flex justify-content-center align-items-center"
                >
                    <select
                        className="fw-normal py-1 rounded"
                        name="city"
                        value={selected}
                        onChange={handleSelectedCity}
                    >
                        {
                            city.map((item: CityData) => (
                                <option
                                    className="bg-light text-dark"
                                    key={item.id}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default City