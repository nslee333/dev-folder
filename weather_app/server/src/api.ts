import axios, {AxiosError, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const baseURL: string = 'http://dataservice.accuweather.com';
const forecastURL: string = '/forecasts/v1/daily/5day/';
const currentURL: string = '/currentconditions/v1/';
const hourlyForecastURL: string = '/forecasts/v1/hourly/12hour/';
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
    const result = await axios.get(baseURL + currentURL + locationKey, {
        params: {
            key: process.env.API_KEY
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

// Forecast axios request
const forecastRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result = await axios.get(baseURL + forecastURL + locationKey, {
        params: {
            key: process.env.API_KEY,
            details: true
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


type realtimeWeatherData = {
    weatherDescription: string,
    hasPrecipitation: boolean,
    precipitationType: string | null,
    temperature: number,
}


export const realtimeWeatherSort: () => Promise<realtimeWeatherData | AxiosError> = async () => {
    const apiResponse: AxiosResponse | AxiosError = await currentRequest();
    if ( apiResponse instanceof AxiosError) return apiResponse;

    const apiData = apiResponse.data;

        
    if (metric) {
        const apiDataMetric: realtimeWeatherData = {
            weatherDescription: apiData.WeatherText,
            hasPrecipitation: apiData.HasPrecipitation,
            precipitationType: apiData.PrecipitationType,
            temperature: apiData.Temperature.Metric.Value,
        }

        return apiDataMetric;

    } else {
        const apiDataImperial: realtimeWeatherData = {
            weatherDescription: apiData.WeatherText,
            hasPrecipitation: apiData.HasPrecipitation,
            precipitationType: apiData.PrecipitationType,
            temperature: apiData.Temperature.Imperial.Value,
        }
        return apiDataImperial;
    }
}


type forecastDailyData = {
    date: string,
    dateEpoch: number,
    maxTemp: number,
    minTemp: number,
    dayIcon: number,
    dayIconPhrase: string,
    dayHasPrecipitation: boolean | null,
    dayPrecipitationType: string | null,
    dayPrecipitationIntensity: string | null,
    nightIcon: number,
    nightIconPhrase: string,
    nightHasPrecipitation: boolean | null,
    nightPrecipitationType: string | null,
    nightPrecipitationIntensity: string | null;
}


export const forecastWeeklySort: () => Promise<forecastDailyData[] | AxiosError> = async () => {
    const apiResponse: AxiosResponse | AxiosError = await forecastRequest();
    if (apiResponse instanceof AxiosError) return apiResponse;


    if (metric) {
        const apiWeeklyForecastMetric: forecastDailyData[] = [];
        const forecastDay = apiResponse.data.forecast.forecastday;
        

        for (const day in forecastDay) {
            

            const apiForecastDay: forecastDailyData = {
                date: '',
                dateEpoch: 0,
                maxTemp: 0,
                minTemp: 0,
                dayIcon: 0,
                dayIconPhrase: '',
                dayHasPrecipitation: null,
                dayPrecipitationType: null,
                dayPrecipitationIntensity: null,
                nightIcon: 0,
                nightIconPhrase: '',
                nightHasPrecipitation: null,
                nightPrecipitationType: null,
                nightPrecipitationIntensity: null
            };
        
            apiWeeklyForecastMetric.push(apiForecastDay)

        }
        return apiWeeklyForecastMetric;

    } else {
        const apiWeeklyForecastImperial: forecastDailyData[] = [];

        let count: number = 0;
        while (apiWeeklyForecastImperial.length < 7) {
            
            const forecastDay = apiResponse.data.forecast.forecastday[count];
            const forecastDayData = forecastDay.day;
            const forecastDayCondition = forecastDayData.condition;

            const apiForecastDay: forecastDailyData = {
                date: '',
                dateEpoch: 0,
                maxTemp: 0,
                minTemp: 0,
                dayIcon: 0,
                dayIconPhrase: '',
                dayHasPrecipitation: null,
                dayPrecipitationType: null,
                dayPrecipitationIntensity: null,
                nightIcon: 0,
                nightIconPhrase: '',
                nightHasPrecipitation: null,
                nightPrecipitationType: null,
                nightPrecipitationIntensity: null
            };
        
            apiWeeklyForecastImperial.push(apiForecastDay)
            count++;
        }

        return apiWeeklyForecastImperial;
    }
}


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