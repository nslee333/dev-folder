import { CityEntry, HourForecast } from "../types/types";

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

  // ^ Checks if the query is a duplicate, used with the cityComponent to eliminate redundant entries.
  export const isDuplicate: (query: string, arrayToQuery: CityEntry[]) => boolean | undefined = (query: string, arrayToQuery: CityEntry[]) => {
    for (let count = 0; count < arrayToQuery.length; count++) {
      if (query === arrayToQuery[count].name) {
        return true;
      } else {
        return false;
      }
    }
  }

  // ^ Ensure that the city query is in either `city, ST` or `city, st` format.
  export const cityQueryValidation: (searchString: string) => true | Error = (searchString: string) => {
    const stringQueryRegex: RegExp = /([A-Z]{1}[a-z]+), (A[LKSZRAEP]|a[lkszraep]|C[AOT]|c[aot]|D[EC]|d[ec]|F[LM]|f[lm]|G[AU]|g[au]|HI|hi|I[ADLN]|i[aldn]|K[SY]|k[sy]|LA|la|M[ADEHINOPST]|m[adehinopst]|N[CDEHJMVY]|n[cdehjmvy]|O[HKR]|o[hkr]|P[ARW]|p[arw]|RI|ri|S[CD]|s[cd]|T[NX]|t[nx]|UT|ut|V[AIT]|v[ait]|W[AIVY]|w[aivy])$/;
    const regexResult: RegExpMatchArray | null = searchString.match(stringQueryRegex);

    if (regexResult === null) return new Error("Bad City Search");
    return true;
}