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
export const dailyRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
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

export const metricUpdate: (metricBool: boolean) => Promise<AxiosResponse | AxiosError> = async (metricBool: boolean) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'settings/metric', {
            metric: metricBool
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    });

    return result;
}

export const locationUpdate: (location: string) => Promise<AxiosResponse | AxiosError> = async (location: string) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'settings/location', {
        locationQuery: location
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    });

    return result;
}

export const cityQuery = async (citiesArrayParam: string[]) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'cities', {
            citiesArray: citiesArrayParam
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    });

    return result;
}