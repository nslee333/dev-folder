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
export const hourlyRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result: AxiosResponse | AxiosError = await axios.get(baseURL + 'hourlyForecast', {})
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}

export const settingsRequest: (location: string, metricBool: boolean) => Promise<AxiosResponse | AxiosError> = async (location: string, metricBool: boolean) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'settings', {
        params: {
            locationQuery: location,
            metric: metricBool
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

module.exports = {
    realtimeRequest,
    weeklyRequest,
    hourlyRequest,
    settingsRequest
}