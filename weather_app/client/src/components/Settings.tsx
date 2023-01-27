import { RefObject, createRef, useEffect, useState, KeyboardEvent, useContext } from "react";
import { cityQueryValidation } from "../utilities/utilities";

export function Settings(): JSX.Element {
  // const [location, setLocation] = useState<string>("Bend, OR");
  // const [metric, setMetric] = useState<boolean>(false);
  // const settingsLocationRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  const metric = useContext({
    location,
    setLocation,
    metric,
    setMetric,
    settingsLocationRef
  });
  const setMetric = useContext(SettingsContext);
  const location = useContext(SettingsContext);
  const setLocation = useContext(SettingsContext);

useEffect(() => {
    let ignore: boolean = false;

    if (!ignore) {
        fetchLocationFromSessionStorage();
        fetchMetricFromSessionStorage();
    }

    return () => {
        ignore = true;
    };
    }, [])

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

export default settingsComponent;