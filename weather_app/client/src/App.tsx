import { AxiosError } from 'axios';
import './App.css';
import {realtimeRequest, dailyRequest, hourlyRequest, settingsRequest} from './actions/actions';
import {realtimeWeatherData, forecastDailyData, forecastHourlyData} from './types/dataTypings'

console.log(window.innerWidth, window.innerHeight)

// TODO: Add useEffect => Request data on page load.

type whichRequest = 'realtime' |  'weekly' | 'hourly';

const dataRequest = async (stringParam: whichRequest) => {

  if (stringParam === 'realtime') {
    const response = await realtimeRequest();
    if (response instanceof AxiosError) return console.error(response);

    const realtimeResult: realtimeWeatherData = response.data;
    return realtimeResult;

  } else if (stringParam === 'weekly') {
    const response = await dailyRequest();
    if (response instanceof AxiosError) return console.error(response);

    const dailyResult: forecastDailyData = response.data;
    return dailyResult;

  } else if (stringParam === 'hourly') {
    const response = await hourlyRequest();
    if (response instanceof AxiosError) return console.error(response);

    const hourlyResult: forecastHourlyData = response.data;
    return hourlyResult;
  }
}


const settingsUpdate = async () => {

}




const realtimeComponent = () => {



  // TODO: Get date, and display below.
  // TODO: Center text. :-)



  return (
    <div className='realtimeMain'>
      <h1 className='realtimeh1'>ICON 72* Cloudy</h1>  
      <h1 className='realtimeh1'>5:41pm</h1>
      <h2 className='realtimeh2'>Tuesday, January 4th 2023</h2>
    </div>
  );
}

function App() {
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
