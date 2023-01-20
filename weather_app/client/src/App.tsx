import { AxiosError, AxiosResponse } from 'axios';
import { RefObject, useEffect, useState, createRef, KeyboardEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import {
  currentWeather,
  forecastWeather
} from './actions/actions';
import {
  CityEntry,
  CurrentWeather,
  DayForecast,
  HourForecast,
  SavedCityData,
} from './types/types'
import {
  faCity, 
  faSliders, 
  faHouse, 
  faCloudSunRain, 
  faCloud, 
  faCloudMoon, 
  faCloudMoonRain, 
  faCloudShowersHeavy, 
  faMoon, 
  faSnowflake, 
  faSun,
  faTriangleExclamation,
  faSmog
} from '@fortawesome/free-solid-svg-icons';

function App() {
const [current, setCurrent] = useState<CurrentWeather>();
const [displayLocation, setDisplayLocation] = useState('');

const [forecastDay, setForecastDay] = useState<DayForecast[]>([]);
const [forecastHour, setForecastHour] = useState<HourForecast[]>([]);
const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));

const [homeHighlighted, setHomeHighlighted] = useState(false); // TODO Reset => TRUE
const [cityHighlighted, setCityHighlighted] = useState(true);
const [settingsHighlighted, setSettingsHighlighted] = useState(false);

const [location, setLocation] = useState("Bend, OR");
const [metric, setMetric] = useState(false);
const settingsLocationRef: RefObject<HTMLInputElement> = createRef();

const citySearchRef: RefObject<HTMLInputElement> = createRef();
const [savedCities, setSavedCities] = useState<CityEntry[]>([]); 
const [savedCityData, setSavedCityData] = useState<SavedCityData[]>([]);
const [idCount, setIdCount] = useState<number>(0); // TODO: Make sure this works.



useEffect(() => { //TODO: Research is there any problems with multiple useEffects?
  forecastFetch();
  currentFetch();
  fetchCityData();
  
}, [])

useEffect(() => {

  const interval = setInterval(() => {
    const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    setTime(newTime);
  }, 1000);

  return () => clearInterval(interval);
  
}, [])



const forecastFetch = async () => {
  const forecastResult = await forecastWeather(location, metric);
  if (forecastResult instanceof AxiosError) return console.error(forecastResult);
  if (forecastResult instanceof Error) return console.error(forecastResult);

  const {
    name, 
    state,
    dayForecast, 
    hourForecast
  } = forecastResult.data;

  setForecastHour(hourForecast);
  setForecastDay(dayForecast);
  setDisplayLocation(`${name}, ${state}`);
}


const currentFetch = async () => {
  const currentResult = await currentWeather(location, metric);
  if (currentResult instanceof AxiosError) return console.error("AxiosError", currentResult);
  if (currentResult instanceof Error) return console.error("Bad Response Error:", currentResult);

  const weatherResult = currentResult.data;

  setCurrent(weatherResult);

}

const date = new Date();

const currentDate = date.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});


const fetchIcon: (weatherIcon: string, className: string) => JSX.Element = (weatherIcon: string, className: string ) => {
  if (weatherIcon === '01d') {
    return <FontAwesomeIcon icon={faSun} className={`${className}`}/>

  } else if (weatherIcon === '01n') {
    return <FontAwesomeIcon icon={faMoon} className={`${className}`}/>;
    
  } else if (weatherIcon === '02d') {
    return <FontAwesomeIcon icon={faCloudSunRain}className={`${className}`}/>
    
  } else if (weatherIcon === '02n') {
    return <FontAwesomeIcon icon={faCloudMoonRain} className={`${className}`}/>
    
  } else if (weatherIcon === '03d') {
    return <FontAwesomeIcon icon={faCloud} className={`${className}`}/>

  } else if (weatherIcon === '03n') {
    return <FontAwesomeIcon icon={faCloudMoon} className={`${className}`}/>
    
  } else if (weatherIcon === '04d' || weatherIcon === '04n') {
    return <FontAwesomeIcon icon={faCloud} className={`${className}`}/>
    
  } else if (weatherIcon === '09d' || weatherIcon === '09n') {
    return <FontAwesomeIcon icon={faCloudShowersHeavy} className={`${className}`}/>
    
  } else if (weatherIcon === '10d' || weatherIcon === '10n') {
    return <FontAwesomeIcon icon={faCloudShowersHeavy} className={`${className}`}/>
    
  
  } else if (weatherIcon === '11d' || weatherIcon === '11n') {
    return <FontAwesomeIcon icon={faCloudShowersHeavy} className={`${className}`}/>
    
  } else if (weatherIcon === '13d' || weatherIcon === '13n') {
    return <FontAwesomeIcon icon={faSnowflake} className={`${className}`}/>
    
  } else if (weatherIcon === '50d' || weatherIcon === '50n') {
    return <FontAwesomeIcon icon={faSmog} className={`${className}`}/>
    
  } else {
    return <FontAwesomeIcon icon={faTriangleExclamation} className={`${className}`} />
    
  }
}

const realtimeComponent = () => {
  if (current) {
    return (
      <div className='realtime-main'>
        <div className='realtime-div1'>{fetchIcon(current.weatherIcon, "realtime-icon")} {current.temperature + '°'}</div>  
        <div className='realtime-div2'>{time}</div>
        <div className='realtime-div2'>{currentDate}</div>
        <div className='realtime-div2'>{displayLocation}</div>
      </div>
    );
  } else {
    return (
      <div className='realtime-main'></div>
    )
  }
}


const hourlyData = (forecastHour: HourForecast) => {
  if (forecastHour !== undefined) {

    const date = new Date(forecastHour.time * 1000)
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
  if (forecastHour !== undefined && forecastHour[5] !== undefined) {
    return (
        <div className='hour-forecast'>
          <div className='hour-forecast__div'>
              <hr className='hour-div__hr'/>
            <div className='hour-div__hours'>
              <div className='hour-div__hours__display'>
                {fetchIcon(forecastHour[0].weatherIcon, "hour-div__hours__display__icon")}
                {" " + hourlyData(forecastHour[0]) + " - "}
                {forecastHour[0].temperature + "° and "}
                {forecastHour[0].condition + " "}
              </div> 
            </div>
              <hr className='hour-div__hr'/>
            <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {fetchIcon(forecastHour[1].weatherIcon, "hour-div__hours__display__icon")}
            {" " + hourlyData(forecastHour[1]) + " - "}
            {forecastHour[1].temperature + "° and "}
            {forecastHour[1].condition}
          </div>
        </div>
            <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {fetchIcon(forecastHour[2].weatherIcon, "hour-div__hours__display__icon")}
            {" " + hourlyData(forecastHour[2]) + " - "}
            {forecastHour[2].temperature + "° and "}
            {forecastHour[2].condition}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {fetchIcon(forecastHour[3].weatherIcon, "hour-div__hours__display__icon")}
            {" " + hourlyData(forecastHour[3]) + " - "}
            {forecastHour[3].temperature + "° and "}
            {forecastHour[3].condition}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {fetchIcon(forecastHour[4].weatherIcon, "hour-div__hours__display__icon")}
            {" " + hourlyData(forecastHour[4]) + " - "}
            {forecastHour[4].temperature + "° and "}
            {forecastHour[4].condition}
          </div>
        </div>
          <hr className='hour-div__hr'/>
        <div className='hour-div__hours'>
          <div className='hour-div__hours__display'>
            {fetchIcon(forecastHour[5].weatherIcon, "hour-div__hours__display__icon")}
            {" " + hourlyData(forecastHour[5]) + " - "}
            {forecastHour[5].temperature + "° and "}
            {forecastHour[5].condition}
          </div>
        </div>
          <hr className='hour-div__hr'/>
      </div>
    </div>
    );
  } else {
    return (
      <div className='hour-forecast'>
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


const dateToDay = (dateEntry: number) => {
  const day = new Date(dateEntry)
  const result = day.getDay();


  if (result === 0) {
    return 'Sunday';
  } else if (result === 1) {
    return 'Monday';
  } else if (result === 2) {
    return 'Tuesday';
  } else if (result === 3) {
    return 'Wednesday';
  } else if (result === 4) {
    return 'Thursday';
  } else if (result === 5) {
    return 'Friday';
  } else if (result === 6) {
    return 'Saturday';
  }
}

const homeComponent: () => JSX.Element = () => {
  if (forecastDay !== undefined && forecastDay[5] !== undefined) {
    return (
      <div className='variable__home'>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>{dateToDay(forecastDay[0].time)}</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDay[0].dayIcon, "variable__home__page__day__conditions__icon")} {fetchIcon(forecastDay[0].nightIcon, "variable__home__page__day__conditions__icon")}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDay[0].maxTemp + "°"} - {forecastDay[0].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[0].dayCondition} during the daytime</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[0].nightCondition} at night</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>{dateToDay(forecastDay[1].time)}</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDay[1].dayIcon, "variable__home__page__day__conditions__icon")} {fetchIcon(forecastDay[1].nightIcon, "variable__home__page__day__conditions__icon")}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDay[1].maxTemp + "°"} - {forecastDay[1].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[1].dayCondition} during the daytime</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[1].nightCondition} at night</div>
            </div>
            
            
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>{dateToDay(forecastDay[2].time)}</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDay[2].dayIcon, "variable__home__page__day__conditions__icon")} {fetchIcon(forecastDay[2].nightIcon, "variable__home__page__day__conditions__icon")}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDay[2].maxTemp + "°"} - {forecastDay[2].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[2].dayCondition} during the daytime</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[2].nightCondition} at night</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>{dateToDay(forecastDay[3].time)}</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDay[3].dayIcon, "variable__home__page__day__conditions__icon")} {fetchIcon(forecastDay[3].nightIcon, "variable__home__page__day__conditions__icon")}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDay[3].maxTemp + "°"} - {forecastDay[3].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[3].dayCondition} during the daytime</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[3].nightCondition} at night</div>
            </div>
          </div>
        <hr className='variable__home__hr'/>
          <div className='variable__home__page'>
            <div className='variable__home__page__day'>{dateToDay(forecastDay[4].time)}</div>
            <div className='variable__home__page__day__conditions'>
              <div className='variable__home__page__day__conditions__icon'>{fetchIcon(forecastDay[4].dayIcon, "variable__home__page__day__conditions__icon")} {fetchIcon(forecastDay[4].nightIcon, "variable__home__page__day__conditions__icon")}</div>
              <div className='variable__home__page__day__conditions__temperature'>{forecastDay[4].maxTemp + "°"} - {forecastDay[4].minTemp + "°"}</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[4].dayCondition} during the daytime</div>
              <div className='variable__home__page__day__conditions__description'>{forecastDay[4].nightCondition} at night</div>
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


  const fetchCityData = async () => { 
    if (savedCities.length === 0) return;
    let cityData: SavedCityData[] = [];
    
    for (let count = 0; count <= savedCities.length; count++ ) {
      const location = savedCities[count].name;
      const dataResult = await currentWeather(location, metric);
      if (dataResult instanceof Error) return console.log("currentWeather Error", dataResult);

      const data = dataResult.data;

      const entryData: SavedCityData = {
        id: idCount + 1,
        name: data.name,
        state: data.state,
        condition: data.condition,
        weatherIcon: data.weatherIcon,
        temperature: data.temperature
      }

      cityData.push(entryData);
      setIdCount(idCount + 1);
    }

    setSavedCityData(cityData);
  }

  
const citySearchHandleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === `Enter`) {
    event.preventDefault()

    if (savedCities.length === 5) return window.alert("Sorry, you cannot have more than five cities saved at a time..")
    if (citySearchRef.current === null) return console.error("City Search Error:", citySearchRef.current);
    
    const cityString: string = citySearchRef.current.value;
    
    
    const validationResult = cityQueryValidation(cityString);
    if (validationResult instanceof Error) return window.alert(validationResult);
    
    const cityEntry: CityEntry = {
      id: idCount + 1,
      name: citySearchRef.current.value,
    }
    
      setIdCount(idCount + 1);
      savedCities.push(cityEntry);
      
    citySearchRef.current.value = "";
  }
}

const deleteCity = (cityId: number) => {
  const index = savedCityData.findIndex(element => element.id === cityId);

  if (index === -1) return console.error("No such city."); 

  savedCities.splice(index, 1);


  fetchCityData();
}


const renderCities = () => {
  const displayCityArray = () => {
    return (
      savedCityData.map(cityEntry => (
        <div key={cityEntry.id} className='variable__city__div'>
          <hr className='variable__city__div__hr'/>
            <div className='variable__city__div__display'>
                <div className='variable__city__div__display__city'>
                  <div className='variable__city__div__display__city__content'>
                    {`${cityEntry.name} - ${cityEntry.name /* //  need to time */}, ${cityEntry.temperature} and ${cityEntry.condition}`}
                  </div>
                  <button className='variable__city__div__display__city__close-btn' onClick={() => deleteCity(cityEntry.id)}>
                    &times;
                  </button>
                </div>
            </div>
        </div>
      ))
    );
  };
  
  const displaySavedCities = () => {
    return (
      savedCities.map(cityEntry => (
        <div key={cityEntry.id} className='variable__city__div'>
          <hr className='variable__city__div__hr'/>
            <div className='variable__city__div__display'>
                <div className='variable__city__div__display__city'>
                  <div className='variable__city__div__display__city__content'>
                    {`${cityEntry}`}
                  </div>
                  <button className='variable__city__div__display__city__close-btn' onClick={event => deleteCity(cityEntry.id)}>
                    &times;
                  </button>
                </div>
            </div>
        </div>
      ))
    );
  };
  

 
  if (savedCityData) {
    return (
      <>
      {displayCityArray()}
      </>
    );

  } else {
    return (
      <>
      {displaySavedCities()}
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
              input type='text' placeholder='Boston, MA' 
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


const cityQueryValidation = (searchString: string) => {
    const stringQueryRegex = /([A-Z]{1}[a-z]+), (A[LKSZRAEP]|a[lkszraep]|C[AOT]|c[aot]|D[EC]|d[ec]|F[LM]|f[lm]|G[AU]|g[au]|HI|hi|I[ADLN]|i[aldn]|K[SY]|k[sy]|LA|la|M[ADEHINOPST]|m[adehinopst]|N[CDEHJMVY]|n[cdehjmvy]|O[HKR]|o[hkr]|P[ARW]|p[arw]|RI|ri|S[CD]|s[cd]|T[NX]|t[nx]|UT|ut|V[AIT]|v[ait]|W[AIVY]|w[aivy])$/;
    
    const regexResult = searchString.match(stringQueryRegex);

    if (regexResult === null) return new Error("Bad City Search");

    return true;
}


// ^ Why is TS returning boolean | void, rather than just boolean? currently using band aid fix 
const handleLocationInput: ( 
event: KeyboardEvent<HTMLInputElement>
) => boolean | void = (event: KeyboardEvent<HTMLInputElement>) => {

  const target = event.target as HTMLInputElement;

  const cityQuery: string = target.value;

  const queryIsValid: Error | true = cityQueryValidation(cityQuery);

  if (queryIsValid instanceof Error && queryIsValid.message === "Bad City Search") {
    return (window.alert("Your search must be in the following format: `Bend, OR` or `Bend, or`."), false);

  } else if (queryIsValid === true) {

    setLocation(cityQuery);
    return (window.alert("Default location successfully updated."), true);

  } else {
    return false; // TODO: Might remove, if TS issue in function is fixed.
  }
}


const handleMetricButtonClick: () => void = () => {
  setMetric(!metric);
  window.alert("Measurement system setting updated.")
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
          placeholder='Boston, MA'
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