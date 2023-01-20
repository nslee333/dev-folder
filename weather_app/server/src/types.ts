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
  temperature: number
}


export type dayForecastType = {
  time: number,

  minTemp: number,
  maxTemp: number,

  dayCondition: string,
  nightCondition: string,

  dayIcon: string,
  nightIcon: string,
}


export type hourForecastType = {
  temperature: number,
  time: number,
  weatherIcon: string,
  condition: string
}


export type forecastCombinedType = {
  name: string,
  state: string,
  dayForecast: dayForecastType[],
  hourForecast: hourForecastType[],
}