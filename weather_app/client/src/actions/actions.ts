import axios, { Axios, AxiosError, AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:1300/api/'


export const realtimeRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result: AxiosResponse | AxiosError = await axios.get(baseURL + 'realtime', {})
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error) {
        return error;
    })

    return result;
} 

// 5 day forecast 
export const weeklyRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result: AxiosResponse | AxiosError = await axios.get(baseURL + 'weeklyForecast', {})
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    });
    
    return result;
}

// Hourly forecast
export const hourlyForecast: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result: AxiosResponse | AxiosError = await axios.get(baseURL + 'hourlyForecast', {})
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}

// Settings call

module.exports = {
    realtimeRequest,
    weeklyRequest,
}