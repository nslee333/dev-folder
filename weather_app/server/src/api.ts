import axios, {AxiosError, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const baseURL: string = 'http://dataservice.accuweather.com';
const forecast: string = '/forecasts/v1/daily/5day/';
const current: string = '/currentconditions/v1/';
const hourlyForecast: string = '/forecasts/v1/hourly/12hour/';
const citySearchURL: string = 'locations/v1/cities/search'

// Example: http://dataservice.accuweather.com + /forecasts/v1/daily/5day/ + 335268 + apikey




let locationQuery: string | number = 97702;
let locationKey: string = '335268';
let metric: boolean = false;


export const updateMetric: (metricBool: boolean) => void = (metricBool : boolean) => {
    metric = metricBool;
}


export const updateQueryParams: (newQueryParams: string | number) => void = (newQueryParams: string | number) => {
    locationQuery = newQueryParams;
    // TODO: Add a function for calling the location api to get the location key. 
    // getLocationKey();
}

const getLocationKey = async () => {
    const result = await axios.get(baseURL + citySearchURL, {
        params: {
            apikey: process.env.API_KEY,
            q: locationQuery
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })
    
    // TODO: assign result.data to locationKey
    return result;
}


const currentRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result = await axios.get(baseURL + current + locationKey, {
        params: {
            key: process.env.API_KEY,
            q: locationQuery
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    return result;
}

// // Forecast axios request
// const forecastRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
//     const result = await axios.get(baseURL + forecastAPIMethod, {
//         params: {
//             key: process.env.API_KEY,
//             q: locationQuery,
//             days: 4
//         }
//     })
//     .then(function (response: AxiosResponse) {
//         return response;
//     })
//     .catch(function (error: AxiosError) {
//         return error;
//     });

//     return result;
// }


type realtimeWeatherData = {
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


// export const realtimeWeatherSort: () => Promise<realtimeWeatherData | AxiosError> = async () => {
//     const apiResponse: AxiosResponse | AxiosError = await realtimeRequest();
//     if ( apiResponse instanceof AxiosError) return apiResponse;

//     // TODO: Need to type these variables.
//     const apiCurrent = apiResponse.data.current;
//     const apiLocation = apiResponse.data.location;
    
//     if (metric) {
//         const apiDataMetric: realtimeWeatherData = {
//             name: apiLocation.name,
//             region: apiLocation.region,
//             country: apiLocation.country,
//             localTime: apiLocation.localtime,
//             temperature: apiCurrent.temp_c,
//             isDay: apiCurrent.is_day,
//             conditionString: apiCurrent.condition.text,
//             conditionIcon: apiCurrent.condition.icon,
//             conditionCode: apiCurrent.condition.code,
//             windSpeed: apiCurrent.wind_kph,
//             precipitation: apiCurrent.precip_mm,
//             humidity: apiCurrent.humidity,
//             feelsLike: apiCurrent.feelslike_c
//         }

//         return apiDataMetric;

//     } else {
//         const apiDataImperial: realtimeWeatherData = {
//             name: apiLocation.name,
//             region: apiLocation.region,
//             country: apiLocation.country,
//             localTime: apiLocation.localtime,
//             temperature: apiCurrent.temp_f,
//             isDay: apiCurrent.is_day,
//             conditionString: apiCurrent.condition.text,
//             conditionIcon: apiCurrent.condition.icon,
//             conditionCode: apiCurrent.condition.code,
//             windSpeed: apiCurrent.wind_mph,
//             precipitation: apiCurrent.precip_in,
//             humidity: apiCurrent.humidity,
//             feelsLike: apiCurrent.feelslike_f
//         }
//         return apiDataImperial;
//     }
// }


type forecastDailyData = {
    date: string,
    dateEpoch: number,
    maxTemp: number,
    minTemp: number,
    totalPrecipitation: number,
    conditionText: string,
}


// export const forecastWeeklySort: () => Promise<forecastDailyData[] | AxiosError> = async () => {
//     const apiResponse: AxiosResponse | AxiosError = await forecastRequest();
//     if (apiResponse instanceof AxiosError) return apiResponse;


//     if (metric) {
//         const apiWeeklyForecastMetric: forecastDailyData[] = [];
//         const forecastDay = apiResponse.data.forecast.forecastday;
        

//         for (const day in forecastDay) {
//             const forecastDay = apiResponse.data.forecast.forecastday[day];
//             const forecastDayData = forecastDay.day;
//             const forecastDayCondition = forecastDayData.condition;

//             const apiForecastDay: forecastDailyData = {
//                 date: forecastDay.date,
//                 dateEpoch: forecastDay.date_epoch,
//                 maxTemp: forecastDayData.maxtemp_c,
//                 minTemp: forecastDayData.mintemp_c,
//                 totalPrecipitation:  forecastDayData.totalprecip_mm,
//                 conditionText: forecastDayCondition.text,
//             };
        
//             apiWeeklyForecastMetric.push(apiForecastDay)

//         }
//         return apiWeeklyForecastMetric;

//     } else {
//         const apiWeeklyForecastImperial: forecastDailyData[] = [];

//         let count: number = 0;
//         while (apiWeeklyForecastImperial.length < 7) {
            
//             const forecastDay = apiResponse.data.forecast.forecastday[count];
//             const forecastDayData = forecastDay.day;
//             const forecastDayCondition = forecastDayData.condition;

//             const apiForecastDay: forecastDailyData = {
//                 date: forecastDay.date,
//                 dateEpoch: forecastDay.date_epoch,
//                 maxTemp: forecastDayData.maxtemp_f,
//                 minTemp: forecastDayData.mintemp_f,
//                 totalPrecipitation:  forecastDayData.totalprecip_in,
//                 conditionText: forecastDayCondition.text,
//             };
        
//             apiWeeklyForecastImperial.push(apiForecastDay)
//             count++;
//         }

//         return apiWeeklyForecastImperial;
//     }
// }


type forecastHourlyData = {
    timeEpoch: number,
    temperature: number,
    conditionText: string,
    precipitation: number; 
}


export const forecastHourlySort: () => Promise<forecastHourlyData[] | AxiosError> = async () => {
    const apiResponse: AxiosResponse | AxiosError = await forecastRequest();
    if (apiResponse instanceof AxiosError) return apiResponse;

    const currentTime = Date.now() / 1000;

    if (metric) {
        const hourlyForecastMetric: forecastHourlyData[] = [];
        
        for (let count = 0; count < 24; count++) {
            if (hourlyForecastMetric.length === 6) return hourlyForecastMetric;

            const apiForecastHour = apiResponse.data.forecast.forecastday[0].hour[count];
            const timeEpoch = apiForecastHour.time_epoch;
           
            if (currentTime < timeEpoch) {
                const hourForecast: forecastHourlyData = {
                    timeEpoch: apiForecastHour.time_epoch,
                    temperature: apiForecastHour.temp_c,
                    conditionText: apiForecastHour.condition.text,
                    precipitation: apiForecastHour.precip_mm,
                }
                hourlyForecastMetric.push(hourForecast);
            }
        }
        return hourlyForecastMetric;
        
    } else {
        const hourlyForecastImperial: forecastHourlyData[] = [];

        for (let count = 0; count < 24; count++) {
            if (hourlyForecastImperial.length === 6) return hourlyForecastImperial;

            const apiForecastHour = apiResponse.data.forecast.forecastday[0].hour[count];
            const timeEpoch = apiForecastHour.time_epoch;
            
            if (currentTime < timeEpoch) {
                const hourForecast: forecastHourlyData = {
                    timeEpoch: apiForecastHour.time_epoch,
                    temperature: apiForecastHour.temp_f,
                    conditionText: apiForecastHour.condition.text,
                    precipitation: apiForecastHour.precip_in,
                }
                hourlyForecastImperial.push(hourForecast);
            }
        }
        return hourlyForecastImperial;
    }
    
}


module.exports = {updateMetric, updateQueryParams, realtimeWeatherSort, forecastWeeklySort, forecastHourlySort};