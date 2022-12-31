import axios, {AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Realtime axios request
const baseURL: string = 'https://api.weatherapi.com/v1/';
const realtimeAPIMethod: string = '/current.json';
const forecastAPIMethod: string = '/forecast.json';
let apiQuery: string | number = 10001;
let metric: boolean = false;


export const updateMetric: (metricBool: boolean) => void = (metricBool : boolean) => {
    metric = metricBool;
}


export const updateQueryParams = (newQueryParams: string | number) => {
    apiQuery = newQueryParams;
}


type weatherData = {
    name: string,
    region: string,
    country: string,
    localTime: string,
    temperature: number,
    isDay: number,
    conditionString: string,
    conditionIcon: string,
    conditionCode: number,
    windSpeed: number,
    precipitation: number,
    humidity: number,
    feelsLike: number,
}


const realtimeRequest: () => Promise<AxiosResponse | Error> = async () => {
    const result = await axios.get(baseURL + realtimeAPIMethod, {
        params: {
            key: process.env.API_KEY,
            q: apiQuery
        }
    })
    .then(function (response: AxiosResponse) {
        return response
    })
    .catch(function (error: string) {
        return new Error(error);
    })

    return result;
}

// Forecast axios request
const forecastRequest = async () => {
    const result = await axios.get(baseURL + forecastAPIMethod, {
        params: {
            key: process.env.API_KEY,
            q: apiQuery,
            days: 7
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: string) {
        return new Error(error);
    });

    return result;
}

export const realtimeRequestAndSort: () => Promise<weatherData | Error> = async () => {
    const apiResponse: AxiosResponse | Error = await realtimeRequest();
    if (apiResponse instanceof Error) return apiResponse;

    const apiCurrent = apiResponse.data.current;
    const apiLocation = apiResponse.data.location;

    if (metric) {
        const apiDataMetric: weatherData = {
            name: apiLocation.name,
            region: apiLocation.region,
            country: apiLocation.country,
            localTime: apiLocation.localtime,
            temperature: apiCurrent.temp_c,
            isDay: apiCurrent.is_day,
            conditionString: apiCurrent.condition.text,
            conditionIcon: apiCurrent.condition.icon,
            conditionCode: apiCurrent.condition.code,
            windSpeed: apiCurrent.wind_kph,
            precipitation: apiCurrent.precip_mm,
            humidity: apiCurrent.humidity,
            feelsLike: apiCurrent.feelslike_c
        }

        return apiDataMetric;

    } else {
        const apiDataImperial: weatherData = {
            name: apiLocation.name,
            region: apiLocation.region,
            country: apiLocation.country,
            localTime: apiLocation.localtime,
            temperature: apiCurrent.temp_f,
            isDay: apiCurrent.is_day,
            conditionString: apiCurrent.condition.text,
            conditionIcon: apiCurrent.condition.icon,
            conditionCode: apiCurrent.condition.code,
            windSpeed: apiCurrent.wind_mph,
            precipitation: apiCurrent.precip_in,
            humidity: apiCurrent.humidity,
            feelsLike: apiCurrent.feelslike_f
        }
        return apiDataImperial;
    }
    
}

export const forecastSortWeekly = async () => {
    const apiResponse: AxiosResponse | Error = await forecastRequest();
    if (apiResponse instanceof Error) return apiResponse;

    
}

export const forecastSortHourly = async () => {
    const apiResponse: AxiosResponse | Error = await forecastRequest();
    if (apiResponse instanceof Error) return apiResponse;
}







// export Forecast and Realtime axios requests


