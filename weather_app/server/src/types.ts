export type geocodeType = {
  name: string,
  state: string,
  lat: number,
  lon: number
}


export type currentWeatherType = {
  name: string,
  state: string,
  condition: string,
  weatherIcon: string, 
  temperature: string
}


export type dayForecastType = {
  minTemp: string,
  maxTemp: string,

  dayCondition: string,
  nightCondition: string,

  dayIcon: string,
  nightIcon: string,
}


export type hourForecastType = {
  temperature: string,
  time: string,
  weatherIcon: string,
  condition: string
}


export type forecastCombinedType = {
  name: string,
  state: string,
  dayForecast: dayForecastType[],
  hourForecast: hourForecastType[],
}