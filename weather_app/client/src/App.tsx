import { AxiosError, AxiosResponse } from 'axios';
import './App.css';
import {realtimeRequest, dailyRequest, hourlyRequest, settingsRequest} from './actions/actions';
import {realtimeWeatherData, forecastDailyData, forecastHourlyData} from './types/dataTypings'
import { useEffect, useState } from 'react';

function App() {

const [realtime, setRealtime] = useState<realtimeWeatherData>();
const [forecastDaily, setForecastDaily] = useState<forecastDailyData>();
const [forecastHourly, setForecastHourly] = useState<forecastHourlyData>();

useEffect(() => {

  // dataFetch(); // TODO: Make sure to limit api calls.
  
}, [])


type dataTuple = [realtimeWeatherData, forecastDailyData, forecastHourlyData];

const dataFetch = async () => {

  const apiData: dataTuple | void = await dataRequest();
  if (apiData === undefined || apiData === null) return console.error("Realtime Data undefined.");

  const [realtime, daily, hourly] = apiData; // JS array destructuring

  setRealtime(realtime);
  setForecastDaily(daily);
  setForecastHourly(hourly);

}


const dataRequest: () => Promise<dataTuple| void> = async (): Promise<dataTuple | void> => {

    const resultArray = [];
  
    const responseRealtime = await realtimeRequest();
    if (responseRealtime instanceof AxiosError) return console.error(responseRealtime);

    const realtimeResult: realtimeWeatherData = responseRealtime.data;
    resultArray.push(realtimeResult);
    
    
    const responseDaily = await dailyRequest();
    if (responseDaily instanceof AxiosError) return console.error(responseDaily);
    
    const dailyResult: forecastDailyData = responseDaily.data;
    resultArray.push(dailyResult);
    
    
    const responseHourly = await hourlyRequest();
    if (responseHourly instanceof AxiosError) return console.error(responseHourly);
    
    const hourlyResult: forecastHourlyData = responseHourly.data;
    resultArray.push(hourlyResult);

    
    const returnArray: dataTuple = [realtimeResult, dailyResult, hourlyResult];
     
    return returnArray;
  
}


const settingsUpdate = async (locationString: string, metricBool: boolean) => {
  const response: AxiosResponse | AxiosError = await settingsRequest(locationString, metricBool);
  if (response instanceof AxiosError) return console.error(response);
  
  console.log(response);
}


const realtimeComponent = () => {
  return (
    <div className='realtimeMain'>
      <h1 className='realtimeh1'>ICON 72* Cloudy</h1>  
      <h1 className='realtimeh1'>5:41pm</h1>
      <h2 className='realtimeh2'>Tuesday, January 4th 2023</h2>
    </div>
  );
}


  return (
    <div className='App'>
      <div className='forecastDiv'></div>
      <div className='navBar'></div>
        <div>{realtimeComponent()}</div>
      <div className='hourForecast'></div>
    </div>
  );
}

export default App;
// 1152 x 1920
