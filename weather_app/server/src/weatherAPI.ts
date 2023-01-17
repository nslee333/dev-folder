import axios, {AxiosError, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
import { 
    cityRealtimeData,
    forecastDailyData, 
    forecastHourlyData, 
    realtimeWeatherData, 
    userSavedCity
} from './types';
dotenv.config();

const geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct';


type geocodeResult = {
    name: string,
    state: string,
    country: string,
    lat: number,
    lon: number
}


// * Geocoding request.
const geocodeRequest = (query: string) => {
    const result = axios.get(geocodingURL + query + 'US', {
        params: {
            limit: 1,
            appid: process.env.weather_key,
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}



const geocodeProcess = (query: string) => {
    // Call geocodeRequest

    // Process data into geocodeResult type.

    // Return data to caller (forecast or current).
}



// * forecastRequest.
    // Params: lat, lon, units

    // Axios Params,
    // lat, lon, appid, units

    // return response to processForecastWeather.

// * processForecastWeather
    // Call geocodeProcess

    // Grab lat, lon from result.

    // Call forecastRequest with lat, lon, units.

    // Bring forecast and geocode data together into a type, 
    //  - then return it to the server request.

// * currentWeatherRequest
    // params: lat, lon and units.

    // Axios.get -> params: lat, lon, appid, units

    // Return response to processCurrentWeather

// * processCurrentWeather
    // Call geocodeProcess

    // Grab lat, lon from geocode process

    // call currentWeatherRequest with lat, lon.

    // bring current and geocode data together into a type
    // - then return it to the server request.
