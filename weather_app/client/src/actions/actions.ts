import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:1300/api/'

// ^ Request current weather data from server.
export const currentWeather: 
(location: string, metric: boolean ) => Promise<AxiosResponse | AxiosError | Error> 
= async (location: string, metric: boolean ) => {
  
  const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'current', {
    "location": location,
    "metric": metric
  })
  .then(function (response: AxiosResponse) {
    if (response.status === 200) {
      return response;
      
    } else {
      return new Error(`Bad response status: ${response.status}, ${response}`);
    }
  })
  .catch(function (error) {
    return error;
  })
  
  return result;
} 

// ^ Request forecast weather data from server.
export const forecastWeather: 
(location: string, metric: boolean) => Promise<AxiosResponse | AxiosError | Error> 
= async (location: string, metric: boolean) => {
  
  const result: AxiosResponse | AxiosError = await axios.post(baseURL + 'forecast', {
    "location": location,
    "metric": metric
  })
  .then(function (response: AxiosResponse) {
    if (response.status === 200) {
      return response;
      
    } else {
      return new Error(`Bad response status: ${response.status}`), response;
    }
  })
  .catch(function (error: AxiosError) {
    return error;
  });
  
  return result;
}