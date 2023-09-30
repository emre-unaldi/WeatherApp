import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";

export interface CityData {
    coordinates: {
        latitude: number,
        longitude: number
    },
    id: number,
    name: string
}

interface CityContextData {
    city: CityData[],
    setCity: React.Dispatch<React.SetStateAction<CityData[]>>,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    cityLoading: boolean,
    setCityLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface CityProviderProps {
    children: ReactNode
}

const initialValues: CityContextData = {
    city: [],
    setCity: (): void => {},
    selected: "",
    setSelected: (): void => {},
    cityLoading: false,
    setCityLoading: (): void => {}
}

const CityContext = createContext<CityContextData>(initialValues)

export const useCity = (): CityContextData => {
    return useContext(CityContext)
}

export const CityProvider: React.FC<CityProviderProps> = ({children}) => {
    const [city, setCity] = useState<CityData[]>([])
    const [selected, setSelected] = useState<string>("Kayseri")
    const [cityLoading, setCityLoading] = useState<boolean>(false)
    const cityApiUrl: string = import.meta.env.VITE_CITY_API_URL

    useEffect(() => {
        axios.get(cityApiUrl)
            .then(async (response) => {
                const data: CityData[] = await response.data.data
                setCity(data)
            })
            .catch((error) => {
                console.error("Error : ", error)
            })
            .finally(() => {
                setCityLoading(true)
            })
    },[])

    const data: CityContextData = {
        city,
        setCity,
        selected,
        setSelected,
        cityLoading,
        setCityLoading
    }

    return (
        <CityContext.Provider value={data}>
            {children}
        </CityContext.Provider>
    )
}