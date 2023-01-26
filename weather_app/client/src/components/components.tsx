import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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


  // ^ Returns a icon that matches the WeatherIcon returned from the OpenWeatherMap api,
  // ^ the icon returned has the className parameter for use in multiple components. 
  export const fetchIcon: (weatherIcon: string, className: string) => JSX.Element 
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