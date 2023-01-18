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


const geocodeRequest = async (query: string) => {
    const result = await axios.get(geocodingURL + query + 'US', {
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

type geocodeResult = {
    name: string,
    state: string,
    country: string,
    lat: number,
    lon: number
}

const geocodeProcess = async (query: string) => {
    const result = await geocodeRequest(query);\
    if (result instanceof AxiosError) return result;

    const data = result.data; // ! Potential issue here, might be .data[0];

    const resultData: geocodeResult = {
        name: data.name,
        state: data.state,
        country: data.country,
        lat: data.lat,
        lon: data.lon
    }

    return resultData;
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
