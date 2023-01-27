import axios, { AxiosError, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import {
    Geocode,
    CurrentWeather,
    DayForecast,
    HourForecast,
    ForecastCombined,
} from './types';

dotenv.config();

const geocodingEndpoint: string = 'https://api.openweathermap.org/geo/1.0/direct';
const currentEndpoint: string = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint: string = 'https://api.openweathermap.org/data/2.5/forecast';

const cooldownEnabled: boolean = false;

let forecastCooldown: number = 0;
let currentCooldown: number = 0;

// ^ API cooldown start for both Current and Forecast weather. 
const startForecastCooldown: () => void = () => {
  if (cooldownEnabled) {
    forecastCooldown = Date.now() + 1800000; // ^ 30 minutes.
  }
}

// ^ See above comment.
const startCurrentCooldown: () => void = () => {
  if (cooldownEnabled) {
    currentCooldown = Date.now() + 1800000;
  }
}

// ^ Checks if cooldown is enabled - returns copy of Weather API data if cooldown is active.
const checkCooldown: (cooldownTime: number) => 
ForecastCombined | CurrentWeather | Error | boolean 
= (cooldownTime: number) => {

  const currentTime: number = Date.now();
  if (cooldownTime > currentTime) {

    if (cooldownTime === forecastCooldown) {
      if (forecastWeatherCopy !== undefined) {
        return forecastWeatherCopy;

      } else {
        return new Error("Forecast Weather data copy undefined error.")
      }

    } else if (cooldownTime === currentCooldown) {
      if (currentWeatherCopy !== undefined) {
        return currentWeatherCopy;

      } else {
        return new Error("Current Weather data copy undefined error.")
      }
    } else {
      return false;
    }

  } else {
    return true;
  }
}

// ^ OpenWeather Geocoding API Request, use the latitude, longitude for making weather requests.
const geocodeRequest: (query: string) => 
Promise<AxiosResponse | AxiosError | Error> 
= async (query: string) => {

  const result: AxiosResponse | AxiosError = await axios.get(geocodingEndpoint, {
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

// ^ Function to handle Geocode API call, grabs and returns needed data.
const geocodeProcess: (query: string) =>
 Promise<Geocode | Error> = async (query: string) => {
  const result: Geocode | AxiosResponse | AxiosError | Error = await geocodeRequest(query);

  if (result instanceof AxiosError) return new Error("Axios Error"), result;
  if (result instanceof Error) return new Error("Bad Response Error"), result;

  const data = result.data[0];

  const resultData: Geocode = {
    name: data.name,
    state: data.state,
    lat: data.lat,
    lon: data.lon
  }

  return resultData;
}

// ^ Function to call Current Weather from OpenWeatherMap.
const currentWeatherRequest: (latitude: number, longitude: number, unitSystem: string) =>
Promise<AxiosResponse | AxiosError>
= async (latitude: number, longitude: number, unitSystem: string) => {
  const result: AxiosResponse | AxiosError = await axios.get(currentEndpoint, {
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

// ^ Copy of current weather data.
let currentWeatherCopy: CurrentWeather = {
  name: '',
  state: '',
  condition: '',
  weatherIcon: '',
  temperature: 0
}

// ^ Process current weather, grabs and returns data.
export const processCurrentWeather: (positionQuery: string, metric: boolean) =>  
Promise<CurrentWeather | Error | AxiosError >
= async (positionQuery: string, metric: boolean) => {
  
  const cooldownResult: CurrentWeather | ForecastCombined | boolean | Error
  = checkCooldown(currentCooldown);

  if (cooldownResult === currentWeatherCopy) 
  return console.log("Current cooldown is active."), cooldownResult;

  const geocodeResult: Geocode | Error = await geocodeProcess(positionQuery);
  if (geocodeResult instanceof AxiosError) return geocodeResult;
  if (geocodeResult instanceof Error) return geocodeResult;

    const {lat, lon} = geocodeResult;
    
    const currentResult: AxiosResponse | AxiosError = 
    await currentWeatherRequest(lat, lon, (metric ? 'metric' : 'imperial'));

    if (currentResult instanceof AxiosError) return currentResult;

    const currentData = currentResult.data

    const weatherResult: CurrentWeather = {
      name: geocodeResult.name,
      state: geocodeResult.state,
      condition: currentData.weather[0].description,
      weatherIcon: currentData.weather[0].icon,
      temperature: currentData.main.temp,
    }

    currentWeatherCopy = weatherResult;

  startCurrentCooldown();
  return weatherResult;
} 

// ^ Function for calling current weather. 
const forecastRequest: (latitude: number, longitude: number, unitSystem: string) => 
Promise<AxiosResponse | AxiosError>
= async (latitude: number, longitude: number, unitSystem: string) => {

  const result: AxiosResponse | AxiosError = await axios.get(forecastEndpoint, {
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

// ^ Copy of forecast data.
let forecastWeatherCopy: ForecastCombined = {
  name: '',
  state: '',
  dayForecast: [],
  hourForecast: []
}

// ^ Handle forecast request, grabs and returns data.
export const processForecastWeather: (locationQuery: string, metric: boolean) 
=> Promise<ForecastCombined | Error | AxiosError >
= async (locationQuery: string, metric: boolean) => {

  const cooldownResult: boolean | ForecastCombined | CurrentWeather | Error 
  = checkCooldown(forecastCooldown);

  if (cooldownResult === forecastWeatherCopy)
  return console.log("Forecast cooldown is active."), cooldownResult;

  const geocodeResult: Geocode | Error = await geocodeProcess(locationQuery);
  if (geocodeResult instanceof AxiosError) return geocodeResult;
  if (geocodeResult instanceof Error) return geocodeResult;

  const {lat, lon} = geocodeResult;

  const forecastResult: AxiosResponse | AxiosError = 
  await forecastRequest(lat, lon, (metric ? 'metric' : 'imperial'));

  if (forecastResult instanceof AxiosError) return forecastResult;
  if (forecastResult instanceof Error) return forecastResult;

  const data = forecastResult.data;
  
  const dayForecastData: DayForecast[] = [];
  
  for (let indexA = 0; indexA < 40; indexA += 8) {
    const list: number = data.list[indexA].main.temp;
    
    let highValue: number = list;
    let highValueIndex: number = indexA;
    let lowValue: number = list;
    let lowValueIndex: number = indexA;
    
    for (let indexB = indexA; indexB < indexA + 8; indexB++) {

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
      time: data.list[indexA].dt,
      maxTemp: data.list[highValueIndex].main.temp,
      minTemp: data.list[lowValueIndex].main.temp, 
      dayCondition: data.list[highValueIndex].weather[0].description,
      nightCondition: data.list[lowValueIndex].weather[0].description,
      dayIcon: data.list[highValueIndex].weather[0].icon,
      nightIcon: data.list[lowValueIndex].weather[0].icon
    };

    dayForecastData.push(entry);
  }

  const hourForecastData: HourForecast[] = [];

  for (let count = 0; count <= 5; count++) {

    const entry: HourForecast = {
      temperature: data.list[count].main.temp,
      time: data.list[count].dt,
      weatherIcon: data.list[count].weather[0].icon,
      condition: data.list[count].weather[0].description
    }

    hourForecastData.push(entry);
  }

  const forecastData: ForecastCombined = {
    name: geocodeResult.name,
    state: geocodeResult.state,
    dayForecast: dayForecastData, 
    hourForecast: hourForecastData
  };

  forecastWeatherCopy = forecastData;

  startForecastCooldown();
  return forecastData;
}
