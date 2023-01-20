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
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';


const geocodeRequest = async (query: string) => {
    const result = await axios.get(geocodingEndpoint, {
        params: {
            q: query + ", US",
            limit: 1,
            appid: process.env.weather_key,
        }
    })
    .then(function (response: AxiosResponse) {
        if (response.status === 200) {
            return response;
        } else {
            return new Error(`Bad Request - Code:${response.status}`), response;
        }
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}

type geocodeType = {
    name: string,
    state: string,
    lat: number,
    lon: number
}

const geocodeProcess = async (query: string) => {
    const result = await geocodeRequest(query);

    if (result instanceof AxiosError) return new Error("Axios Error"), result;
    if (result instanceof Error) return new Error("Bad Response Error"), result;

    const data = result.data[0];

    const resultData: geocodeType = {
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
        if (response.status === 200) {
            return response;
        } else {
            return new Error(`Bad Request - Code:${response.status}`), response;
        }
    })
    .catch(function (error: AxiosError) {
        return error;
    });
    return result;
}


type currentWeatherType = {
    name: string,
    state: string,
    condition: string,
    weatherIcon: string, 
    temperature: string
}


export const processCurrentWeather = async (positionQuery: string, metric: boolean) => {
    const geocodeResult = await geocodeProcess(positionQuery);
    if (geocodeResult instanceof AxiosError) return geocodeResult;
    if (geocodeResult instanceof Error) return geocodeResult;

        const {lat, lon} = geocodeResult;
        
        const currentResult = await currentWeatherRequest(lat, lon, (metric ? 'metric' : 'imperial'));
        if (currentResult instanceof AxiosError) return currentResult;
    
        const currentData = currentResult.data
    
        const weatherResult: currentWeatherType = {
            name: geocodeResult.name,
            state: geocodeResult.state,
            condition: currentData.weather[0].description,
            weatherIcon: currentData.weather[0].icon,
            temperature: `${currentData.main.temp}`,
        } 
    
        return weatherResult;
} 


const forecastRequest = async (latitude: number, longitude: number, unitSystem: string) => {
    const result = axios.get(forecastEndpoint, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.weather_key,
            units: unitSystem
        }
    })
    .then(function (response: AxiosResponse) {
        if (response.status === 200) {
            return response;
        } else {
            return new Error(`Bad request code: ${response.status}`), response;
        }
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}


type dayForecastType = {
  minTemp: string,
  maxTemp: string,

  dayCondition: string,
  nightCondition: string,

  dayIcon: string,
  nightIcon: string,
}

type hourForecastType = {
  temperature: string,
  time: string,
  weatherIcon: string,
  condition: string
}

type forecastCombinedType = {
  name: string,
  state: string,
  dayForecast: dayForecastType[],
  hourForecast: hourForecastType[],
}


export const processForecastWeather = async (locationQuery: string, metric: boolean) => {
    const geocodeResult = await geocodeProcess(locationQuery);
    if (geocodeResult instanceof AxiosError) return geocodeResult;
    if (geocodeResult instanceof Error) return geocodeResult;

    const {lat, lon} = geocodeResult;

    const forecastResult = await forecastRequest(lat, lon, (metric ? 'metric' : 'imperial'));

    if (forecastResult instanceof AxiosError) return forecastResult;
    if (forecastResult instanceof Error) return forecastResult;

    const data = forecastResult.data;

    const dayForecastData: dayForecastType[] = [];


    for (let indexA = 0; indexA < 40; indexA += 8) {
        const list = data.list[indexA].main.temp;
       
        let highValue = list;
        let highValueIndex = 0;
        let lowValue = list;
        let lowValueIndex = 0;
        
        for (let indexB = 0; indexB < 8; indexB++) {
  
            if (data.list[indexB].main.temp > highValue) {
                highValue = data.list[indexB].main.temp;
                highValueIndex = indexB;
              }
              
              if (data.list[indexB].main.temp < lowValue) {
                lowValue = data.list[indexB].main.temp;
                lowValueIndex = indexB;
              }
          
        }
  
      const entry = { 
          maxTemp: data.list[highValueIndex].main.temp,
          minTemp: data.list[lowValueIndex].main.temp, 
          dayCondition: data.list[highValueIndex].weather[0].description,
          nightCondition: data.list[lowValueIndex].weather[0].description,
          dayIcon: data.list[highValueIndex].weather[0].icon,
          nightIcon: data.list[lowValueIndex].weather[0].icon
        };
    
        dayForecastData.push(entry);
    }

    const hourForecastData: hourForecastType[] = [];

    for (let count = 0; count <= 5; count++) {
      const entry: hourForecastType = {
        temperature: data.list[count].main.temp,
        time: data.list[count].dt,
        weatherIcon: data.list[count].weather[0].icon,
        condition: data.list[count].weather[0].description
      }

      hourForecastData.push(entry);
    }

    

    const forecastData: forecastCombinedType = {
      name: geocodeResult.name,
      state: geocodeResult.state,
      dayForecast: dayForecastData, 
      hourForecast: hourForecastData
    };


    return forecastData;
}
