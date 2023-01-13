import axios, {AxiosError, AxiosResponse} from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const baseURL: string = 'http://dataservice.accuweather.com';
const forecastURL: string = '/forecasts/v1/daily/5day/';
const currentURL: string = '/currentconditions/v1/';
const hourlyForecastURL: string = '/forecasts/v1/hourly/12hour/';
const citySearchURL: string = 'locations/v1/cities/search'

let locationQuery: string = '97702';
let locationKey: string = '335268';
let metricBool: boolean = false;

let cooldownEndTime: number = 0;


function startCooldown(): void {
    cooldownEndTime = Date.now() + 3600000; // 20 minutes
}


export const updateMetric: (metricBoolean: boolean) => void = (metricBoolean : boolean) => {
    metricBool = metricBoolean;
}


export const updateQueryParams: (newQueryParams: string) => void = async (newQueryParams: string) => {
    const result = await getLocationKey(locationQuery);
    if (result instanceof Error) return result;
    locationQuery = result; 

}


 const cityRealtimeRequest = async (locationQueryString: string) => {
    // * Call location API, save locationKey
    const cityLocationKey = await getLocationKey(locationQueryString);
    if (cityLocationKey instanceof Error) return cityLocationKey;

    const result = await currentRequest(cityLocationKey);
    if (result instanceof Error) return result;

    return result;
}



// & Type data here.


const cityRealtimeDataCopy: cityRealtimeData[] = [];

type cityRealtimeData = {
    id: string,
    name: string,
    time: string,
    temperature: string,
    condition: string,
  }



const cityRealtimeFetch = async (cityArray: string[]) => {
    if (cooldownEndTime < Date.now()) {

        // & Loop => For every entry:

        const cityDataArray: cityRealtimeData[] = [];

        for (let count = 0; cityArray.length >= count; count++) {
            const result = await cityRealtimeRequest(cityArray[count]);
            if (result instanceof Error) return result;

            const dataResult = result.data 

            const cityRealtimeData: cityRealtimeData = {
                id: `${count}`,
                name: dataResult, // ! fix name problem, grab it from city array? Enforce Capital letters at input validation? 
                time: dataResult.EpochTime,
                temperature: (metricBool ? dataResult.Metric.Value : dataResult.Imperial.Value), // TODO: Use this method to simplify current forecast request.
                condition: dataResult.WeatherText
            }

            cityRealtimeDataCopy.push(cityRealtimeData);
            cityDataArray.push(cityRealtimeData);

        }
        return cityDataArray;

    } else {
        console.log("Cooldown in effect.")
        return cityRealtimeDataCopy;

    }

}



const getLocationKey: (locationQueryString: string) => Promise<AxiosError | string> = async () => {
    const result = await axios.get(baseURL + citySearchURL, {
        params: {
            apikey: process.env.API_KEY,
            q: locationQuery,
        }
    })
    .then(function (response: AxiosResponse) {
        return response;
    })
    .catch(function (error: AxiosError) {
        return error;
    })

    if (result instanceof AxiosError) return result;
    
    const locationKey = result.data.Key;
    return locationKey;
}


const currentRequest: (locationKeyString: string) => Promise<AxiosResponse | AxiosError> = async (locationKeyString: string) => {
    const result = await axios.get(baseURL + currentURL + locationKeyString, { // * Might break here because of locationKeyString
        params: {
            apikey: process.env.API_KEY,
            metric: metricBool
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
            apikey: process.env.API_KEY,
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


const hourlyRequest: () => Promise<AxiosResponse | AxiosError> = async () => {
    const result = await axios.get(baseURL + hourlyForecastURL + locationKey, {
        params: {
            apikey: process.env.API_KEY,
            metric: metricBool,
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        return error;
    })

    if (cooldownEndTime < Date.now()) {
        startCooldown();
    }
    return result;
}


const checkCoolDown: (weatherForecastType: string) => undefined | realtimeWeatherData | forecastDailyData[] | forecastHourlyData[]  = (weatherForecastType: string) => {
    if (cooldownEndTime < Date.now()) {
        return undefined;
    } else {
        console.log("Cooldown in effect.")
        if (weatherForecastType === 'realtime' ) {
            return realtimeWeatherCopy;

        } else if (weatherForecastType === 'daily') {
            return dailyForecastCopy;

        } else if (weatherForecastType === 'hourly') {
            return hourlyForecastCopy;
        }
    }
}


type realtimeWeatherData = {
    weatherDescription: string,
    weatherIcon: number,
    hasPrecipitation: boolean,
    precipitationType: string | null,
    temperature: number,
}


let realtimeWeatherCopy: realtimeWeatherData = {
    weatherDescription: '',
    weatherIcon: 0,
    hasPrecipitation: false,
    precipitationType: null,
    temperature: 0
}


export const realtimeWeatherSort: () => Promise<void | AxiosError | realtimeWeatherData | forecastDailyData[] | forecastHourlyData[]> = async () => {
    const cooldownResult = checkCoolDown('realtime');
    if (typeof cooldownResult !== 'undefined') return cooldownResult;
    
    const apiResponse: AxiosResponse | AxiosError = await currentRequest(locationQuery);
    if ( apiResponse instanceof AxiosError) return apiResponse;

    const apiData = apiResponse.data[0];

    if (metricBool) {
        const apiDataMetric: realtimeWeatherData = {
            weatherDescription: apiData.WeatherText,
            weatherIcon: apiData.WeatherIcon,
            hasPrecipitation: apiData.HasPrecipitation,
            precipitationType: apiData.PrecipitationType,
            temperature: apiData.Temperature.Metric.Value,
        }
        realtimeWeatherCopy = apiDataMetric;
        return apiDataMetric;
        
    } else {
        const apiDataImperial: realtimeWeatherData = {
            weatherDescription: apiData.WeatherText,
            weatherIcon: apiData.WeatherIcon,
            hasPrecipitation: apiData.HasPrecipitation,
            precipitationType: apiData.PrecipitationType,
            temperature: apiData.Temperature.Imperial.Value,
        }
        realtimeWeatherCopy = apiDataImperial;
        return apiDataImperial
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


let dailyForecastCopy: forecastDailyData[] = [];


export const forecastDailySort: () => Promise<void | AxiosError  | realtimeWeatherData | forecastDailyData[] | forecastHourlyData[]> = async () => {
    const cooldownResult = checkCoolDown('daily');
    if (typeof cooldownResult !== 'undefined') return cooldownResult;

    const apiResponse: AxiosResponse | AxiosError = await forecastRequest(); 
    if (apiResponse instanceof AxiosError) return apiResponse;

        const apiDailyForecast: forecastDailyData[] = [];
        
        for (let count: number = 0; count < 5; count++ ) {
            const forecastDay = apiResponse.data.DailyForecasts[count];
            
            const apiForecastDay: forecastDailyData = {
                date: forecastDay.Date,
                dateEpoch: forecastDay.EpochDate,
                maxTemp: forecastDay.Temperature.Maximum.Value,
                minTemp: forecastDay.Temperature.Minimum.Value,
                dayIcon: forecastDay.Day.Icon,
                dayIconPhrase: forecastDay.Day.IconPhrase,
                dayHasPrecipitation: forecastDay.Day.HasPrecipitation,
                dayPrecipitationType: forecastDay.Day.PrecipitationType,
                dayPrecipitationIntensity: forecastDay.Day.PrecipitationIntensity,
                nightIcon: forecastDay.Night.Icon,
                nightIconPhrase: forecastDay.Night.IconPhrase,
                nightHasPrecipitation: forecastDay.Night.HasPrecipitation,
                nightPrecipitationType: forecastDay.Night.PrecipitationType,
                nightPrecipitationIntensity: forecastDay.Night.PrecipitationIntensity
            };
        
            apiDailyForecast.push(apiForecastDay)
            dailyForecastCopy.push(apiForecastDay);

        }
        return apiDailyForecast;
}


type forecastHourlyData = {
    timeEpoch: number,
    weatherIcon: number,
    iconPhrase: string,
    hasPrecipitation: boolean;
    temperature: number,
    precipitationType: string | null,
    precipitationIntensity: string | null,
}

let hourlyForecastCopy: forecastHourlyData[] = [];


export const forecastHourlySort: () => Promise< void | AxiosError | realtimeWeatherData | forecastDailyData[] | forecastHourlyData[]> = async () => {
    const cooldownResult = checkCoolDown('hourly');
    if (typeof cooldownResult !== 'undefined') return cooldownResult;
    
    const apiResponse: AxiosResponse | AxiosError = await hourlyRequest();
    if (apiResponse instanceof AxiosError) return apiResponse;

    const hourlyForecast: forecastHourlyData[] = [];
    
    for (let count = 0; count < 24; count++) {
        if (hourlyForecast.length === 6) return hourlyForecast;
        
        const apiForecastHour = apiResponse.data[count]
        const currentTime = Date.now() / 1000;
        const timeEpoch = apiForecastHour.EpochDateTime;
           
        if (currentTime < timeEpoch) {
            const hourForecast: forecastHourlyData = {
                timeEpoch: apiForecastHour.EpochDateTime,
                weatherIcon: apiForecastHour.WeatherIcon,
                iconPhrase: apiForecastHour.IconPhrase,
                hasPrecipitation: apiForecastHour.hasPrecipitation,
                temperature: apiForecastHour.Temperature.Value,
                precipitationType: apiForecastHour.PrecipitationType,
                precipitationIntensity: apiForecastHour.PrecipitationIntensity
            }
            hourlyForecast.push(hourForecast);
            hourlyForecastCopy.push(hourForecast);
        }
    }
    return hourlyForecast;

}