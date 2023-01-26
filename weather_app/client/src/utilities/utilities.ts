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