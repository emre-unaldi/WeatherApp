/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPEN_WEATHER_API_KEY: string
    readonly VITE_CITY_API_URL: string
    readonly VITE_OPEN_WEATHER_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}