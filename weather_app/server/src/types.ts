export type Geocode = {
  name: string,
  state: string,
  lat: number,
  lon: number
}


export type CurrentWeather = {
  name: string,
  state: string,
  condition: string,
  weatherIcon: string,
  temperature: number
}


export type DayForecast = {
  time: number,

  minTemp: number,
  maxTemp: number,

  dayCondition: string,
  nightCondition: string,

  dayIcon: string,
  nightIcon: string,
}


export type HourForecast = {
  temperature: number,
  time: number,
  weatherIcon: string,
  condition: string
}


export type ForecastCombined = {
  name: string,
  state: string,
  dayForecast: DayForecast[],
  hourForecast: HourForecast[],
}

