export type cityRealtimeData = {
    id: string,
    name: string,
    time: string,
    temperature: string,
    condition: string,
}

export type realtimeWeatherData = {
    weatherDescription: string,
    weatherIcon: number,
    hasPrecipitation: boolean,
    precipitationType: string | null,
    temperature: number,
}

export type forecastDailyData = {
    date: string,
    dateEpoch: number,
    maxTemp: number,
    minTemp: number,
    dayIcon: number,
    dayIconPhrase: string,
    dayHasPrecipitation: boolean | null,
    dayPrecipitationType: string | null,
    dayPrecipitationIntensity: string | null,
    nightIcon: number,
    nightIconPhrase: string,
    nightHasPrecipitation: boolean | null,
    nightPrecipitationType: string | null,
    nightPrecipitationIntensity: string | null;
}

export type forecastHourlyData = {
    timeEpoch: number,
    weatherIcon: number,
    iconPhrase: string,
    hasPrecipitation: boolean;
    temperature: number,
    precipitationType: string | null,
    precipitationIntensity: string | null,
}


export type userSavedCity = {
    id: string,
    name: string
}


export type cityQueryArray = userSavedCity[];

