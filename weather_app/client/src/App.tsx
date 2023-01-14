import { AxiosError, AxiosResponse } from 'axios';
import './App.css';
import {
  realtimeRequest, 
  dailyRequest, 
  hourlyRequest, 
  metricUpdate, 
  locationUpdate,
  cityQuery
} from './actions/actions';
import {
  realtimeWeatherData, 
  forecastDailyData, 
  forecastHourlyData, 
  cityForecastData, 
  dataTuple,
  userSavedCity
} from './types/types'
import { RefObject, useEffect, useState, createRef, KeyboardEvent, Key } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity, 
  faSliders, 
  faHouse, 
  faCloudSunRain, 
  faCloud, 
  faCloudMoon, 
  faCloudMoonRain, 
  faCloudShowersHeavy, 
  faIcicles, faMoon, 
  faSnowflake, 
  faSun, 
  faWind
} from '@fortawesome/free-solid-svg-icons';

function App() {

const [realtime, setRealtime] = useState<realtimeWeatherData>();
const [forecastDaily, setForecastDaily] = useState<forecastDailyData[]>([]);
const [forecastHourly, setForecastHourly] = useState<forecastHourlyData[]>([]);
const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));

const [homeHighlighted, setHomeHighlighted] = useState(true); //TODO Reset => TRUE
const [cityHighlighted, setCityHighlighted] = useState(false);
const [settingsHighlighted, setSettingsHighlighted] = useState(false);

const [location, setLocation] = useState("97702");
const [metric, setMetric] = useState(false);
const settingsLocationRef: RefObject<HTMLInputElement> = createRef();

const citySearchRef: RefObject<HTMLInputElement> = createRef();
const [cityArray, setCityArray] = useState<cityForecastData[]>([]);
const [userSavedCities, setUserSavedCities] = useState<userSavedCity[]>([{id: "0", name: "Boston, MA"}]); // TODO: Make sure this works.
const [idCount, setIdCount] = useState<number>(0); // TODO: Make sure this works.



useEffect(() => { //TODO: Research is there any problems with multiple useEffects?
  dataFetch();
  // fetchCityData();
  
}, [])

useEffect(() => {

  const interval = setInterval(() => {
    const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    setTime(newTime);
  }, 1000);

  return () => clearInterval(interval);
  
}, [])


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


const fetchIcon: (weatherIcon: number ) => JSX.Element = (weatherIcon: number ) => {
  if (weatherIcon >= 1 && weatherIcon <= 5) {
    return <FontAwesomeIcon icon={faSun} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 6 && weatherIcon <= 11) {
    return <FontAwesomeIcon icon={faCloud} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 12 && weatherIcon <= 18) {
    return <FontAwesomeIcon icon={faCloudSunRain}className='variable__home__page__day__conditions__icon'/>
    
  } else if (weatherIcon >= 19 && weatherIcon <= 23) {
    return <FontAwesomeIcon icon={faSnowflake} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon === 24) {
    return <FontAwesomeIcon icon={faIcicles} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 25 && weatherIcon <= 29) {
    return <FontAwesomeIcon icon={faCloudShowersHeavy} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon === 32) {
    return <FontAwesomeIcon icon={faWind} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 33 && weatherIcon <= 35) {
    return <FontAwesomeIcon icon={faMoon} className='variable__home__page__day__conditions__icon'/>;

  } else if (weatherIcon >= 36 && weatherIcon <= 38) {
    return <FontAwesomeIcon icon={faCloudMoon} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 39 && weatherIcon <= 42) {
    return <FontAwesomeIcon icon={faCloudMoonRain} className='variable__home__page__day__conditions__icon'/>

  } else if (weatherIcon >= 42 && weatherIcon <= 44) {
    return <FontAwesomeIcon icon={faSnowflake} className='variable__home__page__day__conditions__icon'/>

  } else {
    return <FontAwesomeIcon icon={faSun} className='variable__home__page__day__conditions__icon' />
    
  }
}

const realtimeComponent = () => {
  if (realtime) {
    return (
      <div className='realtime-main'>
        <div className='realtime-div1'>{fetchIcon(realtime.weatherIcon)} {realtime.temperature + '°'}</div>  
        <div className='realtime-div2'>{time}</div>
        <div className='realtime-div2'>{currentDate}</div>
      </div>
    );
  } else {
    return (
      <div className='realtime-main'></div>
    )
  }
}




const hourlyData = (forecastHour: forecastHourlyData) => {
  if (forecastHour !== undefined) {
    const date = new Date(forecastHour.timeEpoch * 1000)
    const hour = date.getHours();
  
    if (hour === 0) {
      return `12am`
    } else if (hour < 12) { // TODO: Stopped at 0:00 not converting to 12:00am.
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
  if (forecastHourly !== undefined && forecastHourly[5] !== undefined) {
      return (
          <div className='hour-forecast'>
            <div className='hour-forecast__div'>
                <hr className='hour-div__hr'/>
              <div className='hour-div__hours'>
                <div className='hour-div__hours__display'>
                  {hourlyData(forecastHourly[0]) + " - "}
                  {forecastHourly[0].temperature + "° and "}
                  {forecastHourly[0].iconPhrase + " "}
                </div> 
              </div>
                <hr className='hour-div__hr'/>
              <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {hourlyData(forecastHourly[1]) + " - "}
              {forecastHourly[1].temperature + "° and "}
              {forecastHourly[1].iconPhrase}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {hourlyData(forecastHourly[2]) + " - "}
              {forecastHourly[2].temperature + "° and "}
              {forecastHourly[2].iconPhrase}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {hourlyData(forecastHourly[3]) + " - "}
              {forecastHourly[3].temperature + "° and "}
              {forecastHourly[3].iconPhrase}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {hourlyData(forecastHourly[4]) + " - "}
              {forecastHourly[4].temperature + "° and "}
              {forecastHourly[4].iconPhrase}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {hourlyData(forecastHourly[5]) + " - "}
              {forecastHourly[5].temperature + "° and "}
              {forecastHourly[5].iconPhrase}
            </div>
          </div>
            <hr className='hour-div__hr'/>
        </div>
      </div>
    );
  } else {
    return (
      <div className='hour-forecast'>
        <div className='hour-forecast__div'>
        </div>
      </div>
    );
  }
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
  if (forecastDaily !== undefined && forecastDaily[5] !== undefined) {
    return (
      <div className='variable__home'>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>Monday</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>icon</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[0].maxTemp + "°"} - {forecastDaily[0].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDaily[0].dayIconPhrase} - {forecastDaily[0].nightIconPhrase}</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>Tuesday</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>icon</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[1].maxTemp + "°"} - {forecastDaily[1].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDaily[1].dayIconPhrase} - {forecastDaily[1].nightIconPhrase}</div>
            </div>
            
            
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>Wednesday</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>icon</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[2].maxTemp + "°"} - {forecastDaily[2].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDaily[2].dayIconPhrase} - {forecastDaily[2].nightIconPhrase}</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>Thursday</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>icon</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[3].maxTemp + "°"} - {forecastDaily[3].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDaily[3].dayIconPhrase} - {forecastDaily[3].nightIconPhrase}</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>Friday</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDaily[4].dayIcon)}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDaily[4].maxTemp + "°"} - {forecastDaily[4].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDaily[4].dayIconPhrase} - {forecastDaily[4].nightIconPhrase }</div>
            </div>
          </div>
      </div>
    );
  } else {
    return (
      <div className='variable__home'>
        
      </div>
    );
  }
}



// TODO: Sustain data without a database between re-loads
  // & Use ref.

  
  const fetchCityData = async () => {
    // * if cities are saved or initial page load => call this.
    console.log(userSavedCities, "HERE")
    
    const result = await cityQuery(userSavedCities); // TODO: Rewrite backend logic to include id.
    if (result instanceof AxiosError) return console.log("Axios Error:", AxiosError);
    
    const cityData = result.data;
    
    console.log(cityData);
    setCityArray(cityData);
  }
  
  // fetchCityData();
  
const citySearchHandleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === `Enter`) {
    event.preventDefault()
    if (cityArray.length === 5) return window.alert("Sorry, you cannot have more than five cities saved at a time..")
    
    if (citySearchRef.current === null) return console.error("City Search Error:", citySearchRef.current);
    
    const cityString: string = citySearchRef.current.value;
    
    
    const validationResult = cityQueryValidation(cityString);
    if (validationResult instanceof Error) return window.alert(validationResult);
    
    const cityEntry: userSavedCity = {
      id: `${idCount + 1}`,
      name: citySearchRef.current.value,
    }
      setIdCount(idCount + 1);
      userSavedCities.push(cityEntry); // ! Make sure this works, not sure
      console.log(cityEntry)
      console.log(userSavedCities)
      
      
    citySearchRef.current.value = "";
  }
}

const deleteCity = (cityId: string, cityName: string) => {
  // TODO: Still need to finish implementing / debugging this.

  const query: userSavedCity = {id: cityId, name: cityName}
  const index: number = userSavedCities.indexOf(query);

  cityArray.splice(index, 1);


  fetchCityData();
}




const renderCities = () => {

  const displayCityArray = () => {
    return (
      cityArray.map(cityEntry => (
        <div key={cityEntry.id} className='variable__city__div'>
          <hr className='variable__city__div__hr'/>
            <div className='variable__city__div__display'>
                <div className='variable__city__div__display__city'>
                  <div className='variable__city__div__display__city__content'>
                    {`${cityEntry.name} - ${cityEntry.time}, ${cityEntry.temperature} and ${cityEntry.condition}`}
                  </div>
                  <button className='variable__city__div__display__city__close-btn' onClick={event => deleteCity(cityEntry.id, cityEntry.name)}>
                    &times;
                  </button>
                </div>
            </div>
        </div>
      ))
    );
  };
  
  const displayUserSavedCities = () => {
    return (
      userSavedCities.map(cityEntry => (
        <div key={cityEntry.id} className='variable__city__div'>
          <hr className='variable__city__div__hr'/>
            <div className='variable__city__div__display'>
                <div className='variable__city__div__display__city'>
                  <div className='variable__city__div__display__city__content'>
                    {`${cityEntry}`}
                  </div>
                  <button className='variable__city__div__display__city__close-btn' onClick={event => deleteCity(cityEntry.id, cityEntry.name)}>
                    &times;
                  </button>
                </div>
            </div>
        </div>
      ))
    );
  };
  

 
  if (cityArray) {
    return (
      <>
      {displayCityArray()}
      </>
    );

  } else {
    return (
      <>
      {displayUserSavedCities()}
      </>
    )
  }

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
            /> {/*// TODO: Save button that calls fetchCityData */} 
          </form>
          <button className='variable__city__search__save-btn' onClick={fetchCityData}>Save</button>
        </div>
      {renderCities()}
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

    const stringQueryRegex = /([A-Z]{1}[a-z]+), (A[LKSZRAEP]|a[lkszraep]|C[AOT]|c[aot]|D[EC]|d[ec]|F[LM]|f[lm]|G[AU]|g[au]|HI|hi|I[ADLN]|i[aldn]|K[SY]|k[sy]|LA|la|M[ADEHINOPST]|m[adehinopst]|N[CDEHJMVY]|n[cdehjmvy]|O[HKR]|o[hkr]|P[ARW]|p[arw]|RI|ri|S[CD]|s[cd]|T[NX]|t[nx]|UT|ut|V[AIT]|v[ait]|W[AIVY]|w[aivy])$/;
    
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
    return false; // TODO: Might remove, if TS issue in function is fixed.
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