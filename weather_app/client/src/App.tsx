import { AxiosError, AxiosResponse } from 'axios';
import './App.css';
import {realtimeRequest, dailyRequest, hourlyRequest, metricUpdate, locationUpdate} from './actions/actions';
import {realtimeWeatherData, forecastDailyData, forecastHourlyData} from './types/dataTypings'
import { RefObject, useEffect, useState, createRef, KeyboardEvent, Key } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCity, faSliders, faHouse} from '@fortawesome/free-solid-svg-icons';

function App() {

const [realtime, setRealtime] = useState<realtimeWeatherData>();
const [forecastDaily, setForecastDaily] = useState<forecastDailyData[]>([]);
const [forecastHourly, setForecastHourly] = useState<forecastHourlyData[]>([]);
const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
const [cityArray, setCityArray] = useState<cityForecastData[]>([]);

const [homeHighlighted, setHomeHighlighted] = useState(true); //TODO Reset => TRUE
const [cityHighlighted, setCityHighlighted] = useState(false);
const [settingsHighlighted, setSettingsHighlighted] = useState(false);

const [location, setLocation] = useState("97702");
const [metric, setMetric] = useState(false);
const settingsLocationRef: RefObject<HTMLInputElement> = createRef();

const citySearchRef: RefObject<HTMLInputElement> = createRef();
const [userSavedCities, setUserSavedCities] = useState<string[]>([]);

useEffect(() => {

  // dataFetch(); // !! Make sure to limit api calls. 
  // * two times per hour w/ two calls left over.
  // dataFetch();
  
  const interval = setInterval(() => {
    const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    setTime(newTime);
  }, 1000);

  return () => clearInterval(interval);
  
}, [])


useEffect(() => { //TODO: Research is there any problems with multiple useEffects?
  dataFetch();
  fetchCityData();
  
}, [])


type dataTuple = [realtimeWeatherData, forecastDailyData[], forecastHourlyData[]];

const dataFetch = async () => {

  const apiData: dataTuple | void = await dataRequest();
  if (typeof apiData === 'undefined' || apiData === null) return console.error("Realtime Data undefined.");

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
    const dailyResult: forecastDailyData[] = responseDaily.data;
    
    
    const responseHourly = await hourlyRequest();
    if (responseHourly instanceof AxiosError) return console.error(responseHourly);
    const hourlyResult: forecastHourlyData[] = responseHourly.data; 


    const returnArray: dataTuple = [realtimeResult, dailyResult, hourlyResult];
     
    return returnArray;
  
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
      <div className='realtime-div1'>{realtime?.weatherIcon && realtime?.weatherDescription && realtime?.temperature + '°' || 'ICON 72° Cloudy'}</div>  
      <div className='realtime-div2'>{time}</div>
      <div className='realtime-div2'>{currentDate}</div>
    </div>
  );
}




const hourlyData = (forecastHour: forecastHourlyData) => {
  if (forecastHour !== undefined) {
    const date = new Date(forecastHour.timeEpoch * 1000)
    const hour = date.getHours();
  
    if (hour === 0) {
      return `12am`
    }else if (hour < 12) { // TODO: Stopped at 0:00 not converting to 12:00am.
      return `${hour}am`
    } else if (hour === 12) {
      return `${hour}pm`
    } else if (hour > 12) {
      const stdHour = hour - 12;
      return `${stdHour}pm`
    } 

  }
}


const hourForecastComponent = () => { // TODO Correct Upper-left corner display issue,
  return (
    <div className='hour-forecast'>
      <div className='hour-forecast__div'>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[0]) + " - "}
            {forecastHourly[0]?.temperature + "° and "}
            {forecastHourly[0]?.iconPhrase + " "}
          </div> 
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[1]) + " - "}
            {forecastHourly[1]?.temperature + "° and "}
            {forecastHourly[1]?.iconPhrase}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[2]) + " - "}
            {forecastHourly[2]?.temperature + "° and "}
            {forecastHourly[2]?.iconPhrase}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[3]) + " - "}
            {forecastHourly[3]?.temperature + "° and "}
            {forecastHourly[3]?.iconPhrase}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[4]) + " - "}
            {forecastHourly[4]?.temperature + "° and "}
            {forecastHourly[4]?.iconPhrase}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {hourlyData(forecastHourly[5]) + " - "}
            {forecastHourly[5]?.temperature + "° and "}
            {forecastHourly[5]?.iconPhrase}
          </div>
        </div>
          <hr className='hour-div__hr'/>
      </div>
    </div>
  );
}


const handleNavbarClick: (pageClicked: string) => void = (pageClicked: string) => {
  if (pageClicked === 'home' && homeHighlighted === false) {
    setHomeHighlighted(true);
    setCityHighlighted(false);
    setSettingsHighlighted(false);
    
  } else if (pageClicked === 'city' && cityHighlighted === false) {
    setCityHighlighted(true);
    setHomeHighlighted(false);
    setSettingsHighlighted(false);

  } else if (pageClicked === 'settings' && settingsHighlighted === false) {
    setSettingsHighlighted(!settingsHighlighted);
    setHomeHighlighted(false);
    setCityHighlighted(false);
  }
}


type stateHooks = typeof settingsHighlighted | typeof homeHighlighted | typeof cityHighlighted;

const style = (stateHook: stateHooks) => {
    return {backgroundColor: stateHook ? '#9baec8' : '#d9e1e8'};
}


const navbarComponent = () => {
  return (
    <div className='navbar'>
      <div className='navbar__pages' style={style(homeHighlighted)}>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("home")}
          style={style(homeHighlighted)}
        >
          <div className='navbar__pages__button__icon-div' style={style(homeHighlighted)}>
            <
              FontAwesomeIcon icon={faHouse} 
              className='navbar__pages__button__icon-div__icon' 
              style={style(homeHighlighted)}
            /> 
          </div>
          <div className='navbar__pages__button__text' style={style(homeHighlighted)}>
            Home
          </div>
        </button>
    </div>
      <hr className='navbar__hr'/>
      <div className='navbar__pages'style={style(cityHighlighted)}>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("city")}
          style={style(cityHighlighted)}
        >
          <div className='navbar__pages__button__icon-div' style={style(cityHighlighted)}>
            <
              FontAwesomeIcon icon={faCity} 
              className='navbar__pages__button__icon-div__icon' style={style(cityHighlighted)}
            /> 
          </div>
          <div className='navbar__pages__button__text' style={style(cityHighlighted)}>
            City
          </div>
        </button>
      </div>
      
      <hr className='navbar__hr' style={style(settingsHighlighted)}/>
      <div className='navbar__pages' style={style(settingsHighlighted)}>
        <button 
          className='navbar__pages__button' 
          onClick={() => handleNavbarClick("settings")}
          style={style(settingsHighlighted)}
        >
            <div className='navbar__pages__button__icon-div' 
            style={style(settingsHighlighted)}
            >
              <FontAwesomeIcon icon={faSliders} 
              className='navbar__pages__button__icon-div__icon'
              style={style(settingsHighlighted)}
              />
            </div>
            <div className='navbar__pages__button__text'
            style={style(settingsHighlighted)}
            >
              Settings
            </div>
        </button>
      </div>
      <hr className='navbar__hr'/>
    </div>
  );
}


const homeComponent: () => JSX.Element = () => {
  return (
    <div className='variable__home'>
        <div className='variable__home__page'>
          <div className='variable__home__page__day'>Monday</div>
          <div className='variable__home__page__day__conditions'>
            <div className='variable__home__page__day__conditions__icon'>icon</div>
            <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[0]?.maxTemp + "°"} - {forecastDaily[0]?.minTemp + "°"}</div>
            <div className='variable__home__page__day__conditions__description'>{forecastDaily[0]?.dayIconPhrase} - {forecastDaily[0]?.nightIconPhrase}</div>
          </div>
        </div>
      <hr className='variable__home__hr'/>
        <div className='variable__home__page'>
          <div className='variable__home__page__day'>Tuesday</div>
          <div className='variable__home__page__day__conditions'>
            <div className='variable__home__page__day__conditions__icon'>icon</div>
            <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[1]?.maxTemp + "°"} - {forecastDaily[1]?.minTemp + "°"}</div>
            <div className='variable__home__page__day__conditions__description'>{forecastDaily[1]?.dayIconPhrase} - {forecastDaily[1]?.nightIconPhrase}</div>
          </div>
          
          
        </div>
      <hr className='variable__home__hr'/>
        <div className='variable__home__page'>
          <div className='variable__home__page__day'>Wednesday</div>
          <div className='variable__home__page__day__conditions'>
            <div className='variable__home__page__day__conditions__icon'>icon</div>
            <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[2]?.maxTemp + "°"} - {forecastDaily[2]?.minTemp + "°"}</div>
            <div className='variable__home__page__day__conditions__description'>{forecastDaily[2]?.dayIconPhrase} - {forecastDaily[2]?.nightIconPhrase}</div>
          </div>
        </div>
      <hr className='variable__home__hr'/>
        <div className='variable__home__page'>
          <div className='variable__home__page__day'>Thursday</div>
          <div className='variable__home__page__day__conditions'>
            <div className='variable__home__page__day__conditions__icon'>icon</div>
            <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[3]?.maxTemp + "°"} - {forecastDaily[3]?.minTemp + "°"}</div>
            <div className='variable__home__page__day__conditions__description'>{forecastDaily[3]?.dayIconPhrase} - {forecastDaily[3]?.nightIconPhrase}</div>
          </div>
        </div>
      <hr className='variable__home__hr'/>
        <div className='variable__home__page'>
          <div className='variable__home__page__day'>Friday</div>
          <div className='variable__home__page__day__conditions'>
            <div className='variable__home__page__day__conditions__icon'>icon</div>
            <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[4]?.maxTemp + "°"} - {forecastDaily[4]?.minTemp + "°"}</div>
            <div className='variable__home__page__day__conditions__description'>{forecastDaily[4]?.dayIconPhrase} - {forecastDaily[4]?.nightIconPhrase}</div>
          </div>
        </div>
    </div>
  );
}


// TODO: X button clearing a city entry. 

// TODO: Sustain data without a database between re-loads
  // & Use ref.

// ^ id, name, time, temperature and condition
// ^ Boston default value

type cityForecastData = {
  id: number,
  name: string,
  time: string,
  temperature: string,
  condition: string,
}



// TODO: Sustain cities on client side,
// * Function |> calls for every city, sustains data.
// * Then call fetchData().



const fetchCityData = () => {

  // ^ Call 

// TODO: Conditional Unnecessary after api hook up is done, because of conditional at citySearchHandleSubmit, it's impossible for it to happen, I think.
  // if (citiesArray.length < 5) {  
  //   citiesArray.push(entry);
  // }

  setCityArray(citiesArray);
  // TODO: return array
}




const citySearchHandleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === `Enter`) {
    event.preventDefault()
    if (cityArray.length === 5) return window.alert("Sorry, you cannot have more than five cities saved at a time..")
    
    if (citySearchRef.current === null) return console.error("City Search Error:", citySearchRef.current);
    
    const cityString = citySearchRef.current.value;
    
    const validationResult = cityQueryValidation(cityString);
    if (validationResult instanceof Error) return window.alert(validationResult);

    userSavedCities.push(cityString);
    
    // TODO: Call server => call AccuWeatherAPI, save copy of data, return data to client,
    // TODO - Save data array in state, this updates for every call.
    
    citySearchRef.current.value = "";
  }
}


const renderCities: (cityArrayParam: cityForecastData[]) => JSX.Element = (cityArrayParam: cityForecastData[]) => {
  // TODO: Unfinished, need proper data to fix `react key` error.
  
  // const city: JSX.Element[] = cityArrayParam.map(cityEntry => (
    // <div key={cityEntry.id}>
    //   <hr className='variable__city__hr'/>
    //     <div className='variable__city__display'>
    //         <div className='variable__city__display__city'>
    //           <div className='variable__city__display__city__content'>
    //             {`${cityEntry.name} - ${cityEntry.time}, ${cityEntry.temperature} and ${cityEntry.condition}`}
    //           </div>
    //           <button className='variable__city__display__city__close-btn'> 
    //             {/* // TODO: Implement delete button.*/}
    //             &times;
    //           </button>
    //         </div>
    //     </div>
    // </div>
      // 
  // ))

  return (
    // <>
    // {city}
    // </>
    <div></div>
  );
}


const cityComponent: () => JSX.Element = () => {
  return (
    <div className='variable__city'>
        <div className='variable__city__search'>
          <form className='variable__city__search__form'>
            <
              input type='text' placeholder='97702 or Bend, OR' 
              className='variable__city__search__form__input'
              onKeyDown={event => citySearchHandleSubmit(event)}
              ref={citySearchRef}
            />
          </form>
        </div>
      {renderCities(cityArray)}
    </div>
  );
}


const locationUpdateRequest = async (locationQuery: string) => {
  const response: AxiosResponse | AxiosError = await locationUpdate(locationQuery);
  if (response instanceof AxiosError) return console.error(response);
  
  setLocation(locationQuery);
  return response;
}


const cityQueryValidation = (searchString: string) => {
  const cityQueryIsANumber: boolean = (!isNaN(parseInt(searchString)))

  if (cityQueryIsANumber) {
    if (searchString.length !== 5) return new Error("Bad Zip Code");
    
    return true;

  } else {
    const stringQueryRegex = /([a-zA-Z]+), (A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/i;
    
    const regexResult = searchString.match(stringQueryRegex);

    if (regexResult === null) return new Error("Bad City Search");

    return true;
  }
}
// ^ Why is TS returning boolean | void, rather than just boolean? currently using bandaid fix 
const handleLocationInput: ( 
event: KeyboardEvent<HTMLInputElement>
) => boolean | void = (event: KeyboardEvent<HTMLInputElement>) => {

  const target = event.target as HTMLInputElement;

  const cityQuery: string = target.value;

  const queryIsValid: Error | true = cityQueryValidation(cityQuery);

  if (queryIsValid instanceof Error && queryIsValid.message === "Bad Zip Code") {
    return (window.alert("Zip code must be exactly 5 digits long."), false);

  } else if (queryIsValid instanceof Error && queryIsValid.message === "Bad City Search") {
    return (window.alert("Your search must be in the following format: `Bend, OR` or `Bend, or`."), false);

  } else if (queryIsValid === true) {
    const result = locationUpdateRequest(cityQuery);
    if (result instanceof AxiosError) return window.alert("Location update error, please try again."); 
    return (window.alert("Default location successfully updated."), true);

  } else {
    return false;
  }
}

const metricUpdateRequest = async (metricBool: boolean) => {
  const response: AxiosResponse | AxiosError = await metricUpdate(metricBool);
  if (response instanceof AxiosError) return (console.error(response), window.alert("Measurement system update error, please try again."));
  window.alert("Measurement system successfully updated.")
  setMetric(!metric);
}


const handleMetricButtonClick: () => void = () => {
  metricUpdateRequest(!metric);
}

/* 
  ^ Keydown Handler: Location input.
  ^ Submits string => `handleLocationInput` on `Enter` keypress.
  ^ Clears Ref after submission.
*/ 

const keyDownLocationHandler: (event: KeyboardEvent<HTMLInputElement>) => void = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    const result = handleLocationInput(event);


    if (settingsLocationRef.current === null) {
      return console.error("Settings Location Ref Error:", settingsLocationRef.current)
    }

    if (result === true) {
      settingsLocationRef.current.value = ""
    };
  }
}



const settingsComponent: () => JSX.Element = () => {
  return (
    <div className='variable__settings'>
      <div className='variable__settings__location-div'>
        <div className='variable__settings__location-div__input-label'>Change Location</div>
        <div className='variable__settings__location-div__current-location'>Location: {location}</div>
        <form>

        <input className='variable__settings__location-div__input' 
          type='text'
          onKeyDown={keyDownLocationHandler}
          ref={settingsLocationRef}
          placeholder='City or ZIP Code'
        />
        </form>
      </div>  
      <div className='variable__settings__metric'>
        <div className='variable__settings__metric__button-label'>Change Measurement System</div>
        <div className='variable__settings__metric__metric-current'>Current: {metric ? 'Metric' : 'Imperial'}</div>
        <button className='variable__settings__metric__button' onClick={handleMetricButtonClick}>{metric ? 'Imperial' : 'Metric'}</button>
      </div> 
    </div>
  );
}


const variableBar: () => JSX.Element = () => {
  return (
    <div className='variable'>
      {settingsHighlighted ? settingsComponent() : cityHighlighted ? 
      cityComponent() : homeComponent()}
    </div>
  );
}


  return (
    <div className='App'>
      <div>{variableBar()}</div>
      <div>{navbarComponent()}</div>
      <div>{realtimeComponent()}</div>
      <div>{hourForecastComponent()}</div>
    </div>
    
  );
}


export default App;