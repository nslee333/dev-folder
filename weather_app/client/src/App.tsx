import { AxiosError, AxiosResponse } from 'axios';
import './App.css';
import {realtimeRequest, dailyRequest, hourlyRequest, settingsRequest} from './actions/actions';
import {realtimeWeatherData, forecastDailyData, forecastHourlyData} from './types/dataTypings'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEarthAmericas, faLocationDot, faSliders, faHouse} from '@fortawesome/free-solid-svg-icons';
function App() {

const [realtime, setRealtime] = useState<realtimeWeatherData>();
const [forecastDaily, setForecastDaily] = useState<forecastDailyData>();
const [forecastHourly, setForecastHourly] = useState<forecastHourlyData>();
const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));


useEffect(() => {

  // dataFetch(); // !! Make sure to limit api calls.
  
  const interval = setInterval(() => {
    const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    setTime(newTime);
  }, 1000);

  return () => clearInterval(interval);
  
})


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
    // TODO: Make sure this works.
  
    const responseRealtime = await realtimeRequest();
    if (responseRealtime instanceof AxiosError) return console.error(responseRealtime);
    const realtimeResult: realtimeWeatherData = responseRealtime.data;
    
    
    const responseDaily = await dailyRequest();
    if (responseDaily instanceof AxiosError) return console.error(responseDaily);
    const dailyResult: forecastDailyData = responseDaily.data;
    
    
    const responseHourly = await hourlyRequest();
    if (responseHourly instanceof AxiosError) return console.error(responseHourly);
    const hourlyResult: forecastHourlyData = responseHourly.data; 
    // TODO: Need the data shape to type effectively.


    const returnArray: dataTuple = [realtimeResult, dailyResult, hourlyResult];
     
    return returnArray;
  
}


const settingsUpdate = async (locationString: string, metricBool: boolean) => {
  const response: AxiosResponse | AxiosError = await settingsRequest(locationString, metricBool);
  if (response instanceof AxiosError) return console.error(response);
  
  console.log(response);
}


const date = new Date();
const currentDate = date.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});


const realtimeComponent = () => {
  return (
    <div className='realtime-main'>
      <h1 className='realtime-h1'>{realtime?.weatherIcon && realtime?.weatherDescription && realtime?.temperature || 'ICON 72* Cloudy'}</h1>  
      <h2 className='realtime-h1'>{time}</h2>
      <h2 className='realtime-h2'>{currentDate}</h2>
    </div>
  );
}


const hourForecastComponent = () => { // TODO: Might need to remove two parent divs.
  return (
    <div className='hour-forecast'>
      <div className='hour-div'>
        <div className='hour-div__hours'>{`8:00 72*`}</div>
        <div className='hour-div__hours'>{`9:00 65*`}</div>
        <div className='hour-div__hours'>{`10:00 55*`}</div>
        <div className='hour-div__hours'>{`11:00 43* `}</div>
        <div className='hour-div__hours'>{`12:00 32*`}</div>
        <div className='hour-div__hours'>{`1:00 29*`}</div>
      </div>
  </div>
  );
}


const navbarComponent = () => {
  return (
    <div className='navbar'>
      <div className='navbar__pages'>
        <div className='navbar__pages__content'>
          <div className='navbar__pages__content__icon'>
            <FontAwesomeIcon icon={faHouse} className='navbar__pages--icon'/> 
          </div>
          <div className='navbar__pages__content__text'>
            Home
          </div>
          </div>
        </div>
      <div className='navbar__pages'>
        <div className='navbar__pages__content'>
          <div className='navbar__pages__content__icon'>
            <FontAwesomeIcon icon={faEarthAmericas} className='navbar__pages--icon'/> 
          </div>
          <div className='navbar__pages__content__text'>
            World
          </div>
          </div>
        </div>
      <div className='navbar__pages'>
        <div className='navbar__pages__content'>
          <div className='navbar__pages__content__icon'>
            <FontAwesomeIcon icon={faLocationDot} className='navbar__pages--icon'/> 
          </div>
          <div className='navbar__pages__content__text'>
            Map  
          </div>
          </div>
        </div>
      <div className='navbar__pages'>
        <div className='navbar__pages__content'>
          <div className='navbar__pages__content__icon'>
            <div className='navbar__pages__content__icon'>
              <FontAwesomeIcon icon={faSliders} className='navbar__pages--icon'/>
            </div>
            <div className='navbar__pages__content__text'>
              Settings
            </div>
          </div>
          </div>
        </div>
    </div>
  );
}


  return (
    <div className='App'>
      <div className='forecast-div'></div>
      <div>
        {navbarComponent()}
      </div>
        <div>{realtimeComponent()}</div>
      <div>{hourForecastComponent()}</div>
      {/* <FontAwesomeIcon icon={faEarthAmericas} className='icon' /> 
        <FontAwesomeIcon icon={faLocationDot} className='icon'/> */}
    </div>
    
  );
}


export default App;