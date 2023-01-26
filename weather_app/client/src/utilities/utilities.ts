import { HourForecast } from "../types/types";

// ^ Takes in Epoch time for an hour entry, and returns a time for display.
export const hourlyData: (forecastHour: HourForecast, dataReady: boolean) => string | undefined 
  = (forecastHour: HourForecast) => {

      const date: Date = new Date(forecastHour.time * 1000)
      const hour: number = date.getHours();
    
      if (hour === 0) {
        return `12am`
      } else if (hour < 12) {
        return `${hour}am`
      } else if (hour === 12) {
        return `${hour}pm`
      } else if (hour > 12) {
        const stdHour = hour - 12;
        return `${stdHour}pm`
      }
}

// ^ Takes in an epoch time, returns a day of the week, used in the home component.
export const dateToDay: (dateEntry: number) => string = (dateEntry: number) => {
    const day: Date = new Date(dateEntry * 1000)
    const result: number = day.getDay();


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
    } else {
      return 'dateToDayError';
    }
  }