import axios, {AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Realtime axios request
const baseURL: string = 'https://api.weatherapi.com/v1/';
const realtimeAPIMethod: string = '/current.json';
const forecastAPIMethod: string = '/forecast.json';
let baseQuery: string | number = 10001;

export const updateQueryParams = (newQueryParams: string | number) => {
    baseQuery = newQueryParams;
}


export const realtimeRequest: () => Promise<AxiosResponse | Error> = async () => {
    const result = await axios.get(baseURL + realtimeAPIMethod, {
        params: {
            key: process.env.API_KEY,
            q: baseQuery
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
export const forecastRequest = async () => {
    
}


// https://api.weatherapi.com/v1/current.json?key=<>q=97702 - query for 97702, current api.

// Maybe What I'll need to do is sort out the specific data in api.ts, then give it back
// to server.ts






// export Forcast and Realtime axios requests


