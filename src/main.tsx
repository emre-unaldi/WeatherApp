import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {CityProvider} from "./context/CityContext.tsx";
import {WeatherProvider} from "./context/WeatherContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CityProvider>
        <WeatherProvider>
            <App />
        </WeatherProvider>
    </CityProvider>
  </React.StrictMode>,
)
