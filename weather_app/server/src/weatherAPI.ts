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

const geocodingEndpoint = 'https://api.openweathermap.org/geo/1.0/direct';
const currentEndpoint = 'https://api.openweathermap.org/data/2.5/weather';


const geocodeRequest = async (query: string) => {
    const result = await axios.get(geocodingEndpoint + query + 'US', {
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

type geocodeData = {
    name: string,
    state: string,
    lat: number,
    lon: number
}

const geocodeProcess = async (query: string) => {
    const result = await geocodeRequest(query);
    if (result instanceof AxiosError) return result;

    const data = result.data; // ! Potential issue here, might be .data[0];

    const resultData: geocodeData = {
        name: data.name,
        state: data.state,
        lat: data.lat,
        lon: data.lon
    }

    return resultData;
}




const currentWeatherRequest = async (latitude: number, longitude: number, unitSystem: string) => {
    const result = axios.get(currentEndpoint, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.weather_key,
            units: unitSystem,
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    });

    return result;
}
    type currentWeatherData = {
        name: string,
        state: string,
        condition: string,
        weatherIcon: string, 
        temperature: string
    }


const processCurrentWeather = async (positionQuery: string, metric: boolean) => {
    const geocodeResult = await geocodeProcess(positionQuery);
    if (geocodeResult instanceof AxiosError) return geocodeResult;

    const {lat, lon} = geocodeResult;

    const currentResult = await currentWeatherRequest(lat, lon, (metric ? 'metric' : 'imperial'));
    if (currentResult instanceof AxiosError) return currentResult;

    const currentData = currentResult.data

    const weatherResult: currentWeatherData = {
        name: geocodeResult.name,
        state: geocodeResult.state,
        condition: currentData.weather.description,
        weatherIcon: currentData.weather.icon,
        temperature: `${currentData.main.temp}`,
    } 

    return weatherResult;
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

