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

const [homeHighlighted, setHomeHighlighted] = useState(false);
const [worldHighlighted, setWorldHighlighted] = useState(false);
const [mapHighlighted, setMapHighlighted] = useState(false);
const [settingsHighlighted, setSettingsHighlighted] = useState(false);


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

const handleNavbarClick: (pageClicked: string) => void = (pageClicked: string) => {
  if (pageClicked === 'home' && homeHighlighted === false) {
    setHomeHighlighted(true);
    setWorldHighlighted(false);
    setMapHighlighted(false);
    setSettingsHighlighted(false);
    
  } else if (pageClicked === 'world' && worldHighlighted === false) {
    setWorldHighlighted(true);
    setHomeHighlighted(false);
    setMapHighlighted(false);
    setSettingsHighlighted(false);

  } else if (pageClicked === 'map' && mapHighlighted === false) {
    setMapHighlighted(true);
    setHomeHighlighted(false);
    setWorldHighlighted(false);
    setSettingsHighlighted(false);

    
  } else if (pageClicked === 'settings' && settingsHighlighted === false) {
    setSettingsHighlighted(!settingsHighlighted);
    setHomeHighlighted(false);
    setWorldHighlighted(false);
    setMapHighlighted(false);
  }
}


const navbarComponent = () => {
  return (
    <div className='navbar'>
      <div className='navbar__pages'>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("home")}
          style={{backgroundColor: homeHighlighted ? 'var(--main-darkGrey)' : 'var(--main-grey'}}
        >
          <div className='navbar__pages__button__icon-div'>
            <FontAwesomeIcon icon={faHouse} className='navbar__pages__button__icon-div__icon'/> 
          </div>
          <div className='navbar__pages__button__text'>
            Home
          </div>
        </button>
    </div>
      <hr className='navbar__hr'/>

      <div className='navbar__pages'>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("world")}
          style={{backgroundColor: worldHighlighted ? 'var(--main-darkGrey)' : 'var(--main-grey'}}
        >
          <div className='navbar__pages__button__icon-div'>
            <FontAwesomeIcon icon={faEarthAmericas} className='navbar__pages__button__icon-div__icon'/> 
          </div>
          <div className='navbar__pages__button__text'>
            World
          </div>
        </button>
      </div>
      <hr className='navbar__hr'/>
      <div className='navbar__pages'>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("map")} 
          style={{backgroundColor: mapHighlighted ? 'var(--main-darkGrey)' : 'var(--main-grey' }}
        >
          <div className='navbar__pages__button__icon-div'>
            <FontAwesomeIcon icon={faLocationDot} className='navbar__pages__button__icon-div__icon'/> 
          </div>
          <div className='navbar__pages__button__text'>
            Map  
          </div>
        </button>
      </div>
      <hr className='navbar__hr' style={{backgroundColor: 'var(--settings-color)'}}/>
      <div className='navbar__pages' style={{backgroundColor: 'var(--settings-color)'}}>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("settings")}
          style={{
            backgroundColor: settingsHighlighted ? 
            '--settings-color: grey' : '--settings-color: var(--main-grey)'}}
        >
            <div className='navbar__pages__button__icon-div' 
            style={{backgroundColor: 'var(--settings-color)'}}
            >
              <FontAwesomeIcon icon={faSliders} 
              className='navbar__pages__button__icon-div__icon'
              style={{backgroundColor: 'var(--settings-color)'}}
              />
            </div>
            <div className='navbar__pages__button__text'
            style={{backgroundColor: 'var(--settings-color)'}}
            >
              Settings
            </div>
        </button>
      </div>
      <hr className='navbar__hr'/>
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
    </div>
    
  );
}


export default App;