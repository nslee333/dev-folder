import axios, { Axios, AxiosError, AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:1300/api/'


export const currentWeather: (location: string, metric: boolean ) => Promise<AxiosResponse | AxiosError> = async (location: string, metric: boolean ) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'current', {
        "body": {
            "location": location,
            "metric": metric
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error) {
        return error;
    })

    return result;
} 


export const forecastWeather: (location: string, metric: boolean) => Promise<AxiosResponse | AxiosError> = async (location: string, metric: boolean) => {
    const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'forecast', {
        "body": {
            "location": location,
            "metric": metric
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