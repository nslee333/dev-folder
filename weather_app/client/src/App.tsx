import { AxiosError, AxiosResponse } from 'axios';
import { RefObject, useEffect, useState, createRef, KeyboardEvent } from 'react';
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
  CssStyle,
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
import { cityQueryValidation, dateToDay, hourlyData, isDuplicate } from './utilities/utilities';


function App() {
  const [displayLocation, setDisplayLocation] = useState('');
  const [dataReady, setDataReady] = useState<boolean>(false); 
  const [time, setTime] = useState<string>
  (new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
  
  const [current, setCurrent] = useState<CurrentWeather>();
  const [forecastDay, setForecastDay] = useState<DayForecast[]>([]);
  const [forecastHour, setForecastHour] = useState<HourForecast[]>([]);

  const [homeHighlighted, setHomeHighlighted] = useState<boolean>(true);
  const [cityHighlighted, setCityHighlighted] = useState<boolean>(false);
  const [settingsHighlighted, setSettingsHighlighted] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Bend, OR");
  const [metric, setMetric] = useState<boolean>(false);
  const settingsLocationRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const citySearchRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  const [savedCities, setSavedCities] = useState<CityEntry[]>([]); 
  const [savedCityData, setSavedCityData] = useState<SavedCityData[]>([]);
  const [idCount, setIdCount] = useState<number>(0);

  // ^ Grab todays current date for display.
  const date: Date = new Date();
  const currentDate: string = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // ^ useEffect to check if data has been loaded, reruns everytime state changes.
  useEffect(() => {
    let ignore: boolean = false;

    if (!ignore){
      isDataReady();

    }
    
    return () => {
      ignore = true;
    };
  })

  // ^ Fetch saved cities from localStorage, and location and metric's values from sessionStorage.
  useEffect(() => {
    let ignore: boolean = false;

    if (!ignore) {
      fetchCitiesFromStorage();
      fetchLocationFromSessionStorage();
      fetchMetricFromSessionStorage();
    }

    return () => {
      ignore = true;
    };
  }, [])

  // ^ Fetch forecast and current weather data from server.
  useEffect(() => {
    let ignore: boolean = false;
    
    if (!ignore) {
      forecastFetch();
      currentFetch();
    }
    
    return () => {
      ignore = true;
    };
  }, [location, metric])

  // ^ Fetch current data for each city that the user has saved in the city component.
  useEffect(() => {
    let ignore: boolean = false;
    
    if (!ignore) {
      fetchCityData();
    }

    return () => {
      ignore = true;
    };

  }, [savedCities])

  // ^ A timer that updates the display time every second.
  useEffect(() => {
    
    const interval: NodeJS.Timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      setTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
    
  }, [])

  // ^ Checks if forecast data has been retrieved, if true allow components to render data.
  const isDataReady: () => void = () => { 
    if (forecastDay[4] !== undefined && forecastHour[4] !== undefined) {
      setDataReady(true);
    }
  }

  // ^ Fetch forecast weather, destructure and set the data to their state hooks.
  const forecastFetch: () => Promise<void> = async () => {
    const forecastResult: AxiosResponse | AxiosError | Error = await forecastWeather(location, metric);
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

  // ^ Fetch current weather data, and set to the current state hook. 
  const currentFetch: () => Promise<void> = async () => {
    const currentResult: AxiosResponse | AxiosError | Error = await currentWeather(location, metric);
    if (currentResult instanceof AxiosError) return console.error("AxiosError", currentResult);
    if (currentResult instanceof Error) return console.error("Bad Response Error:", currentResult);

    const weatherResult: CurrentWeather = currentResult.data;

    setCurrent(weatherResult);
  }


  // ^ JSX for main window that displays time and current weather of the user's location.
  const currentComponent: () => JSX.Element = () => {
    if (current) {
      return (
        <div className='current__main'>
          <div className='current__div1'>
            {fetchIcon(current.weatherIcon, "current__icon")} 
            {current.temperature + '°'}
          </div>  
          <div className='current__div2'>{time}</div>
          <div className='current__div2'>{currentDate}</div>
          <div className='current__div2'>{displayLocation}</div>
        </div>
      );

    } else {
      return (
        <div className='current__main'></div>
      )
    }
  }

  
  // ^ Returns a icon that matches the WeatherIcon returned from the OpenWeatherMap api,
  // ^ the icon returned has the className parameter for use in multiple components. 
  const fetchIcon: (weatherIcon: string, className: string) => JSX.Element 
  = (weatherIcon: string, className: string ) => {
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


  // ^ Display component for the hourly forecast. 
  const hourForecastComponent: () => JSX.Element = () => {
    if (dataReady) {
      return (
          <div className='hour-forecast'>
            <div className='hour-forecast__div'>
                <hr className='hour-div__hr'/>
              <div className='hour-div__hours'>
                <div className='hour-div__hours__display'>
                  {fetchIcon(forecastHour[0].weatherIcon, "hour-div__hours__display__icon")}
                  {" " + hourlyData(forecastHour[0], dataReady) + " - "}
                  {forecastHour[0].temperature + "° and "}
                  {forecastHour[0].condition + " "}
                </div> 
              </div>
                <hr className='hour-div__hr'/>
              <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {fetchIcon(forecastHour[1].weatherIcon, "hour-div__hours__display__icon")}
              {" " + hourlyData(forecastHour[1], dataReady) + " - "}
              {forecastHour[1].temperature + "° and "}
              {forecastHour[1].condition}
            </div>
          </div>
              <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {fetchIcon(forecastHour[2].weatherIcon, "hour-div__hours__display__icon")}
              {" " + hourlyData(forecastHour[2], dataReady) + " - "}
              {forecastHour[2].temperature + "° and "}
              {forecastHour[2].condition}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {fetchIcon(forecastHour[3].weatherIcon, "hour-div__hours__display__icon")}
              {" " + hourlyData(forecastHour[3], dataReady) + " - "}
              {forecastHour[3].temperature + "° and "}
              {forecastHour[3].condition}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {fetchIcon(forecastHour[4].weatherIcon, "hour-div__hours__display__icon")}
              {" " + hourlyData(forecastHour[4], dataReady) + " - "}
              {forecastHour[4].temperature + "° and "}
              {forecastHour[4].condition}
            </div>
          </div>
            <hr className='hour-div__hr'/>
          <div className='hour-div__hours'>
            <div className='hour-div__hours__display'>
              {fetchIcon(forecastHour[5].weatherIcon, "hour-div__hours__display__icon")}
              {" " + hourlyData(forecastHour[5], dataReady) + " - "}
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

  // ^ Handles navbar clicks - uses state hooks to track what display tab is selected. 
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


  type stateHooks = 
  typeof settingsHighlighted | typeof homeHighlighted | typeof cityHighlighted;

  // ^ Used to highlight the selected navbar tab for the user.
  const style: (stateHook: stateHooks) => CssStyle = (stateHook: stateHooks) => {
    return {backgroundColor: stateHook ? '#9baec8' : '#d9e1e8'};
  }

  const navbarComponent: () => JSX.Element = () => {
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
    if (dataReady) {
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
        <div className='variable__home'></div>
      );
    }
  }

    // ^ Saves the user's cities to localStorage.
    const saveCitiesToStorage: (city: CityEntry) => void = (city: CityEntry) => {
        localStorage.setItem(`${idCount}`, city.name);
        setIdCount(idCount + 1);
    }

    // ^ Fetches saved cities from local storage.
    const fetchCitiesFromStorage: () => void = () => {
      const savedCitiesArray: CityEntry[] = [];

      for (let count = 0; count < localStorage.length; count++ ) {
        const entry: string | null = localStorage.getItem(`${count}`);

        if (entry !== null) {
          const city: CityEntry = {
            id: count,
            name: entry
          }
          savedCitiesArray.push(city);
        }
      }

      setSavedCities(savedCitiesArray);
    }

    // ^ Fetches current weather data for each saved city, saves to the savedCityData state hook.
    const fetchCityData: () => Promise<void> = async () => {
      if (savedCities.length === 0) return;
      setSavedCityData([]);
      let cityData: SavedCityData[] = [];
      
      for (let count = 0; count < savedCities.length; count++ ) {
        const locationQuery: string = savedCities[count].name;

        const dataResult: AxiosResponse | AxiosError | Error 
        = await currentWeather(locationQuery, metric);

        if (dataResult instanceof Error) return console.log("currentWeather Error", dataResult);
        const data = dataResult.data;
        
        const entryData: SavedCityData = {
          id: idCount,
          name: data.name,
          state: data.state,
          condition: data.condition,
          weatherIcon: data.weatherIcon,
          temperature: data.temperature
        }
        cityData.push(entryData);
      }
      
      setSavedCityData(cityData);
    }
    
    // ^ Handles any new city input, throws an error if there are too many cities saved, 
    // ^ if the city is a duplicate, or if the city is in the wrong format.
    // ^ Saves to local storage and re-fetches city data if above is ok.
    const citySearchHandleSubmit: (event: KeyboardEvent<HTMLInputElement>) 
    => void = (event: KeyboardEvent<HTMLInputElement>) => {

      if (event.key === `Enter`) {
      event.preventDefault()
      

      if (savedCities.length === 5) 
        return window.alert("Sorry, you cannot have more than five cities saved at a time..")
      if (citySearchRef.current === null) 
        return console.error("City Search Error:", citySearchRef.current);
      
      const isDuplicateResult: boolean | undefined = isDuplicate(citySearchRef.current.value, savedCities);
      if (isDuplicateResult) return console.log("Duplicate Error"); 

      const cityString: string = citySearchRef.current.value;
      const validationResult: true | Error = cityQueryValidation(cityString);
      if (validationResult instanceof Error) return window.alert(validationResult);
      
      const cityEntry: CityEntry = {
        id: idCount,
        name: citySearchRef.current.value,
      }
      
        setIdCount(idCount + 1);
        savedCities.push(cityEntry);
        
      citySearchRef.current.value = "";
      saveCitiesToStorage(cityEntry);
      fetchCityData();
    }
  }

  // ^ Delete a saved city from savedCities hook and localStorage.
  const deleteCity: (cityId: number) => void = (cityId: number) => {
    
    const index: number = savedCities.findIndex(element => element.id === cityId);

    if (index === -1) return console.error("No such city."); 

    for (let count = 0; count <= savedCities.length; count++) {
      savedCities.splice(index, 1);
    }

    localStorage.removeItem(`${cityId}`);
  
    fetchCityData();
  }


  const renderCities: () => JSX.Element = () => {
    const displayCityArray = () => {
      return (
        savedCityData.map((cityEntry, index) => (
          <div key={index} className='variable__city__div'>
            <hr className='variable__city__div__hr'/>
              <div className='variable__city__div__display'>
                  <div className='variable__city__div__display__city'>
                    <div className='variable__city__div__display__city__content'>
                      {`${cityEntry.name} - ${cityEntry.state} ${cityEntry.temperature}° and ${cityEntry.condition}`}
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
    
    const displaySavedCities: () => JSX.Element[] = () => {
      return (
        savedCities.map(cityEntry => (
          <div key={cityEntry.id} className='variable__city__div'></div>
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
              />  
            </form>
          </div>
        {renderCities()}
      </div>
    );
  }


  // ^ Save and fetch - location - session storage.
  const saveLocationToSessionStorage: (locationQuery: string) => void = (locationQuery: string) => {
    sessionStorage.setItem('location', `${locationQuery}`);
  }

  // ^ See above comment.
  const fetchLocationFromSessionStorage: () => void = () => {
    const locationResult: string | null = sessionStorage.getItem('location');
    if (locationResult === null) return console.error("Location not pulled from session storage");
    setLocation(locationResult);
  }


  // ^ Handle and validate new default location, save to session storage if ok. 
  const handleLocationInput: ( 
  event: KeyboardEvent<HTMLInputElement>
  ) => boolean | void = (event: KeyboardEvent<HTMLInputElement>) => {

    const target: HTMLInputElement = event.target as HTMLInputElement;

    const cityQuery: string = target.value;

    const queryIsValid: Error | true = cityQueryValidation(cityQuery);

    if (queryIsValid instanceof Error && queryIsValid.message === "Bad City Search") {
      return (
        window.alert("Your search must be in the following format: `Bend, OR` or `Bend, or`.")
        , false);

    } else if (queryIsValid) {

      setLocation(cityQuery);
      saveLocationToSessionStorage(cityQuery);
      return (window.alert("Default location successfully updated."), true);

    } else {
      return false;
    }
  }

  // ^ Save and fetch - metric - session storage.
  const saveMetricToSessionStorage: () => void = () => {
    sessionStorage.setItem('metric', `${metric}`)
  }

  // ^ See above comment.
  const fetchMetricFromSessionStorage: () => void = () => {
    const metricResult: string | null = sessionStorage.getItem('metric');
    if (metricResult !== null) {
      const isImperialSet = (metricResult === 'false');
      setMetric(isImperialSet);
    } 
  }

  // ^ Handles metric button click, saves to state hook and session storage.
  const handleMetricButtonClick: () => void = () => {
    setMetric(!metric);
    saveMetricToSessionStorage();
    window.alert("Measurement system setting updated.")
  }

  // ^ key down handler for submitting on `Enter` key press, clears input element.
  const keyDownLocationHandler: (event: KeyboardEvent<HTMLInputElement>) => void = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const result: boolean | void = handleLocationInput(event);

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
        <div>{currentComponent()}</div>
        <div>{hourForecastComponent()}</div>
      </div>
      
    );
  }


export default App;