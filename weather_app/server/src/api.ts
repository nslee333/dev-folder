import axios, {AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Realtime axios request
const baseURL: string = 'https://api.weatherapi.com/v1/';
const realtimeAPIMethod: string = '/current.json';
const forecastAPIMethod: string = '/forecast.json';
let apiQuery: string | number = 10001;
let celsius: boolean = false;

export const updateCelsius: (celsiusBool: boolean) => void = (celsiusBool : boolean) => {
    celsius = celsiusBool;
}

export const updateQueryParams = (newQueryParams: string | number) => {
    apiQuery = newQueryParams;
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
            q: apiQuery
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

export const realtimeRequestAndSort = async () => {
    const apiResponse: AxiosResponse | Error = await realtimeRequest();
    if (apiResponse instanceof Error) return new Error("API Error.");

    if (celsius) {
        
    }
    
}

export const forecastRequestAndSort = async () => {

}







// export Forcast and Realtime axios requests


