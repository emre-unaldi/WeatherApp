import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";

export interface WeatherData {
    dt_txt: string,
    main: {
        feels_like: number,
        humidity: number,
        pressure: number,
        temp: number,
        temp_kf: number,
        temp_max: number,
        temp_min: number
    },
    visibility: number,
    weather: {
        description: string,
        icon: string,
        id: number
    }[]
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

interface WeatherContextData {
    weathers: WeatherData[],
    setWeathers: React.Dispatch<React.SetStateAction<WeatherData[]>>
    hourlyWeathers: WeatherData[],
    setHourlyWeathers: React.Dispatch<React.SetStateAction<WeatherData[]>>,
    coordinates: Coordinates,
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>,
    weathersLoading: boolean,
    setWeathersLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface WeatherProviderProps {
    children: ReactNode
}

const initialValues: WeatherContextData = {
    weathers: [],
    setWeathers: (): void => {},
    hourlyWeathers: [],
    setHourlyWeathers: (): void => {},
    coordinates: {
        latitude: 38.73111,
        longitude: 35.47889
    },
    setCoordinates: (): void => {},
    weathersLoading: false,
    setWeathersLoading: (): void => {}

}

const WeatherContext = createContext<WeatherContextData>(initialValues)

export const useWeather = (): WeatherContextData => {
    return useContext(WeatherContext)
}

export const capitalizeFirstLetter = (str: string): string => {
    return str
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({children}) => {
    const [weathers, setWeathers] = useState<WeatherData[]>([])
    const [hourlyWeathers, setHourlyWeathers] = useState<WeatherData[]>([])
    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: 38.73111,
        longitude: 35.47889
    })
    const [weathersLoading, setWeathersLoading] = useState<boolean>(false)
    const apiKey: string = import.meta.env.VITE_OPEN_WEATHER_API_KEY
    const weatherApiUrl: string = import.meta.env.VITE_OPEN_WEATHER_API_URL

    useEffect(() => {
        axios.get(`${weatherApiUrl}lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&lang=tr&units=metric`)
            .then(async (response) => {
                const data: WeatherData[] = await response.data.list
                const dailyFiltered: WeatherData[] = data.filter((item: WeatherData, index: number) => {
                    if (index % 8 == 0) {
                        return item
                    }
                })
                const hourlyFiltered: WeatherData[] = data.slice(0,8)

                setWeathers(dailyFiltered)
                setHourlyWeathers(hourlyFiltered)
            })
            .catch((error) => {
                console.log("Error : ", error)
            })
            .finally(() => {
                setWeathersLoading(true)
            })
    }, [coordinates])

    const data: WeatherContextData = {
        weathers,
        setWeathers,
        coordinates,
        setCoordinates,
        weathersLoading,
        setWeathersLoading,
        hourlyWeathers,
        setHourlyWeathers
    }

    console.log(weathers)

    return (
        <WeatherContext.Provider value={data}>
            {children}
        </WeatherContext.Provider>
    )
}