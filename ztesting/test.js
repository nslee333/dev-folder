
const sort = (parse) => {
  const dayForecastData = [];
  
  for (let indexA = 0; indexA < 41; indexA += 8) {
      // const data = list[indexA];
     
      let highValue = parse.list[indexA];
      let highValueIndex = 0;
      let lowValue = parse.list[indexA];
      let lowValueIndex = 0;
      
      for (let indexB = 0; indexB < 8; indexB++) {

          if (parse.list[indexB] > highValue) {
              highValue = parse.list[indexB];
              highValueIndex = indexB;
            }
            
            if (parse.list[indexB] < lowValue) {
              lowValue = parse.list[indexB];
              lowValueIndex = indexB;
            }
        
      }

    const entry = { 
        maxTemp: parse.list[highValueIndex].main.temp,
        minTemp: parse.list[lowValueIndex].main.temp, 
        dayCondition: parse.list[highValueIndex].weather.description,
        nightCondition: parse.list[lowValueIndex].weather.description,
        dayIcon: parse.list[highValueIndex].weather.description,
        nightIcon: parse.list[lowValueIndex].weather.description
      };
  
      dayForecastData.push(entry);

  }
  return dayForecastData;
}




// const sort = (data) => {
//   const dayForecastData = [];

//   // For every 8 entries, go through array elements [1-8] and grab the largest and smallest temp indexes,
//   // Grab your day / night data from the high and low indexes.
//   for (let indexA = 0; indexA < 41; indexA += 8) {
//       const list = data.list[indexA]
     
//       let highValue = list;
//       let highValueIndex = 0;
//       let lowValue = list;
//       let lowValueIndex = 0;
      
//       for (let indexB = 0; indexB < 8; indexB++) {

//           if (data.list[indexB] > highValue) {
//               highValue = data.list[indexB];
//               highValueIndex = indexB;
//             }
            
//             if (data.list[indexB] < lowValue) {
//               lowValue = data.list[indexB];
//               lowValueIndex = indexB;
//             }
        
//       }

//     const entry = { 
//         maxTemp: data.list[highValueIndex].main.temp,
//         minTemp: data.list[lowValueIndex].main.temp, 
//         dayCondition: data.list[highValueIndex].weather.description,
//         nightCondition: data.list[lowValueIndex].weather.description,
//         dayIcon: data.list[highValueIndex].weather.description,
//         nightIcon: data.list[lowValueIndex].weather.description
//       };
  
//       dayForecastData.push(entry);
//   }
//   return dayForecastData;
// }












const parseThis = {
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1674021600,
            "main": {
                "temp": 21.61,
                "feels_like": 9.01,
                "temp_min": 21.61,
                "temp_max": 24.17,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 987,
                "humidity": 32,
                "temp_kf": -1.42
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 42
            },
            "wind": {
                "speed": 14,
                "deg": 245,
                "gust": 21.3
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-18 06:00:00"
        },
        {
            "dt": 1674032400,
            "main": {
                "temp": 21.15,
                "feels_like": 12.76,
                "temp_min": 21.15,
                "temp_max": 21.54,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 986,
                "humidity": 36,
                "temp_kf": -0.22
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 77
            },
            "wind": {
                "speed": 6.6,
                "deg": 213,
                "gust": 7.52
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-18 09:00:00"
        },
        {
            "dt": 1674043200,
            "main": {
                "temp": 18.18,
                "feels_like": 7.45,
                "temp_min": 18.18,
                "temp_max": 18.18,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 986,
                "humidity": 46,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 99
            },
            "wind": {
                "speed": 8.75,
                "deg": 280,
                "gust": 15.39
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-18 12:00:00"
        },
        {
            "dt": 1674054000,
            "main": {
                "temp": 14.74,
                "feels_like": 3.38,
                "temp_min": 14.74,
                "temp_max": 14.74,
                "pressure": 1016,
                "sea_level": 1016,
                "grnd_level": 987,
                "humidity": 62,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 87
            },
            "wind": {
                "speed": 8.57,
                "deg": 268,
                "gust": 22.44
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-18 15:00:00"
        },
        {
            "dt": 1674064800,
            "main": {
                "temp": 12.2,
                "feels_like": -0.4,
                "temp_min": 12.2,
                "temp_max": 12.2,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 988,
                "humidity": 69,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 45
            },
            "wind": {
                "speed": 10.22,
                "deg": 282,
                "gust": 23.8
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-18 18:00:00"
        },
        {
            "dt": 1674075600,
            "main": {
                "temp": 9.39,
                "feels_like": -3.21,
                "temp_min": 9.39,
                "temp_max": 9.39,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 989,
                "humidity": 69,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 8.75,
                "deg": 291,
                "gust": 19.28
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-18 21:00:00"
        },
        {
            "dt": 1674086400,
            "main": {
                "temp": 8.69,
                "feels_like": -2.85,
                "temp_min": 8.69,
                "temp_max": 8.69,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 991,
                "humidity": 65,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 20
            },
            "wind": {
                "speed": 7.25,
                "deg": 283,
                "gust": 11.25
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-19 00:00:00"
        },
        {
            "dt": 1674097200,
            "main": {
                "temp": 17.04,
                "feels_like": 6.73,
                "temp_min": 17.04,
                "temp_max": 17.04,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 992,
                "humidity": 34,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 7.87,
                "deg": 319,
                "gust": 10.51
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-19 03:00:00"
        },
        {
            "dt": 1674108000,
            "main": {
                "temp": 19.62,
                "feels_like": 10.8,
                "temp_min": 19.62,
                "temp_max": 19.62,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 991,
                "humidity": 25,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 6.73,
                "deg": 334,
                "gust": 8.21
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-19 06:00:00"
        },
        {
            "dt": 1674118800,
            "main": {
                "temp": 14.43,
                "feels_like": 8.08,
                "temp_min": 14.43,
                "temp_max": 14.43,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 992,
                "humidity": 31,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 68
            },
            "wind": {
                "speed": 3.8,
                "deg": 311,
                "gust": 4.18
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-19 09:00:00"
        },
        {
            "dt": 1674129600,
            "main": {
                "temp": 10.4,
                "feels_like": -2.2,
                "temp_min": 10.4,
                "temp_max": 10.4,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 996,
                "humidity": 40,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 79
            },
            "wind": {
                "speed": 16.58,
                "deg": 323,
                "gust": 26.22
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-19 12:00:00"
        },
        {
            "dt": 1674140400,
            "main": {
                "temp": 4.08,
                "feels_like": -8.52,
                "temp_min": 4.08,
                "temp_max": 4.08,
                "pressure": 1028,
                "sea_level": 1028,
                "grnd_level": 998,
                "humidity": 40,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 17.27,
                "deg": 311,
                "gust": 26.44
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-19 15:00:00"
        },
        {
            "dt": 1674151200,
            "main": {
                "temp": -0.06,
                "feels_like": -12.66,
                "temp_min": -0.06,
                "temp_max": -0.06,
                "pressure": 1030,
                "sea_level": 1030,
                "grnd_level": 1000,
                "humidity": 43,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 54
            },
            "wind": {
                "speed": 16.53,
                "deg": 303,
                "gust": 26.11
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-19 18:00:00"
        },
        {
            "dt": 1674162000,
            "main": {
                "temp": -2.81,
                "feels_like": -15.41,
                "temp_min": -2.81,
                "temp_max": -2.81,
                "pressure": 1031,
                "sea_level": 1031,
                "grnd_level": 1001,
                "humidity": 44,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 11.74,
                "deg": 308,
                "gust": 22.39
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-19 21:00:00"
        },
        {
            "dt": 1674172800,
            "main": {
                "temp": -3.66,
                "feels_like": -16.26,
                "temp_min": -3.66,
                "temp_max": -3.66,
                "pressure": 1033,
                "sea_level": 1033,
                "grnd_level": 1003,
                "humidity": 47,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 9.51,
                "deg": 283,
                "gust": 17.45
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-20 00:00:00"
        },
        {
            "dt": 1674183600,
            "main": {
                "temp": 3.99,
                "feels_like": -8.61,
                "temp_min": 3.99,
                "temp_max": 3.99,
                "pressure": 1034,
                "sea_level": 1034,
                "grnd_level": 1004,
                "humidity": 30,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 9.1,
                "deg": 305,
                "gust": 12.68
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-20 03:00:00"
        },
        {
            "dt": 1674194400,
            "main": {
                "temp": 8.42,
                "feels_like": -2.99,
                "temp_min": 8.42,
                "temp_max": 8.42,
                "pressure": 1031,
                "sea_level": 1031,
                "grnd_level": 1002,
                "humidity": 22,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 7.07,
                "deg": 260,
                "gust": 10.38
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-20 06:00:00"
        },
        {
            "dt": 1674205200,
            "main": {
                "temp": 5.2,
                "feels_like": -7.13,
                "temp_min": 5.2,
                "temp_max": 5.2,
                "pressure": 1030,
                "sea_level": 1030,
                "grnd_level": 1000,
                "humidity": 27,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 2
            },
            "wind": {
                "speed": 7.31,
                "deg": 154,
                "gust": 9.04
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-20 09:00:00"
        },
        {
            "dt": 1674216000,
            "main": {
                "temp": 4.82,
                "feels_like": -7.78,
                "temp_min": 4.82,
                "temp_max": 4.82,
                "pressure": 1029,
                "sea_level": 1029,
                "grnd_level": 999,
                "humidity": 29,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 42
            },
            "wind": {
                "speed": 9.66,
                "deg": 154,
                "gust": 19.82
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-20 12:00:00"
        },
        {
            "dt": 1674226800,
            "main": {
                "temp": 5.74,
                "feels_like": -6.86,
                "temp_min": 5.74,
                "temp_max": 5.74,
                "pressure": 1027,
                "sea_level": 1027,
                "grnd_level": 998,
                "humidity": 29,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 8.55,
                "deg": 147,
                "gust": 17.92
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-20 15:00:00"
        },
        {
            "dt": 1674237600,
            "main": {
                "temp": 6.22,
                "feels_like": -4.16,
                "temp_min": 6.22,
                "temp_max": 6.22,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 996,
                "humidity": 33,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 5.75,
                "deg": 148,
                "gust": 11.23
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-20 18:00:00"
        },
        {
            "dt": 1674248400,
            "main": {
                "temp": 6.53,
                "feels_like": 6.53,
                "temp_min": 6.53,
                "temp_max": 6.53,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 994,
                "humidity": 35,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 1.63,
                "deg": 66,
                "gust": 2.53
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-20 21:00:00"
        },
        {
            "dt": 1674259200,
            "main": {
                "temp": 3.79,
                "feels_like": -8.81,
                "temp_min": 3.79,
                "temp_max": 3.79,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 996,
                "humidity": 40,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 9.19,
                "deg": 3,
                "gust": 14.85
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-21 00:00:00"
        },
        {
            "dt": 1674270000,
            "main": {
                "temp": 8.08,
                "feels_like": -4.52,
                "temp_min": 8.08,
                "temp_max": 8.08,
                "pressure": 1028,
                "sea_level": 1028,
                "grnd_level": 999,
                "humidity": 29,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 94
            },
            "wind": {
                "speed": 14.2,
                "deg": 13,
                "gust": 16.71
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-21 03:00:00"
        },
        {
            "dt": 1674280800,
            "main": {
                "temp": 9.28,
                "feels_like": -3.32,
                "temp_min": 9.28,
                "temp_max": 9.28,
                "pressure": 1028,
                "sea_level": 1028,
                "grnd_level": 999,
                "humidity": 37,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 72
            },
            "wind": {
                "speed": 13.73,
                "deg": 18,
                "gust": 15.35
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-21 06:00:00"
        },
        {
            "dt": 1674291600,
            "main": {
                "temp": 3.72,
                "feels_like": -8.88,
                "temp_min": 3.72,
                "temp_max": 3.72,
                "pressure": 1031,
                "sea_level": 1031,
                "grnd_level": 1002,
                "humidity": 53,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 65
            },
            "wind": {
                "speed": 10.36,
                "deg": 46,
                "gust": 16.89
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-21 09:00:00"
        },
        {
            "dt": 1674302400,
            "main": {
                "temp": -0.67,
                "feels_like": -13.27,
                "temp_min": -0.67,
                "temp_max": -0.67,
                "pressure": 1034,
                "sea_level": 1034,
                "grnd_level": 1005,
                "humidity": 64,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 38
            },
            "wind": {
                "speed": 8.14,
                "deg": 43,
                "gust": 16.4
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-21 12:00:00"
        },
        {
            "dt": 1674313200,
            "main": {
                "temp": -3.84,
                "feels_like": -16.44,
                "temp_min": -3.84,
                "temp_max": -3.84,
                "pressure": 1037,
                "sea_level": 1037,
                "grnd_level": 1006,
                "humidity": 73,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 34
            },
            "wind": {
                "speed": 8.57,
                "deg": 32,
                "gust": 15.64
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-21 15:00:00"
        },
        {
            "dt": 1674324000,
            "main": {
                "temp": -4.63,
                "feels_like": -17.23,
                "temp_min": -4.63,
                "temp_max": -4.63,
                "pressure": 1038,
                "sea_level": 1038,
                "grnd_level": 1007,
                "humidity": 70,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 66
            },
            "wind": {
                "speed": 10.33,
                "deg": 37,
                "gust": 16.06
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-21 18:00:00"
        },
        {
            "dt": 1674334800,
            "main": {
                "temp": -4.59,
                "feels_like": -17.19,
                "temp_min": -4.59,
                "temp_max": -4.59,
                "pressure": 1038,
                "sea_level": 1038,
                "grnd_level": 1008,
                "humidity": 70,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 8.7,
                "deg": 42,
                "gust": 11.34
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-21 21:00:00"
        },
        {
            "dt": 1674345600,
            "main": {
                "temp": -5.15,
                "feels_like": -17.75,
                "temp_min": -5.15,
                "temp_max": -5.15,
                "pressure": 1039,
                "sea_level": 1039,
                "grnd_level": 1009,
                "humidity": 89,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 600,
                    "main": "Snow",
                    "description": "light snow",
                    "icon": "13d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 10.69,
                "deg": 40,
                "gust": 13.89
            },
            "visibility": 345,
            "pop": 0.2,
            "snow": {
                "3h": 0.21
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-22 00:00:00"
        },
        {
            "dt": 1674356400,
            "main": {
                "temp": -2.54,
                "feels_like": -15.14,
                "temp_min": -2.54,
                "temp_max": -2.54,
                "pressure": 1040,
                "sea_level": 1040,
                "grnd_level": 1010,
                "humidity": 78,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 600,
                    "main": "Snow",
                    "description": "light snow",
                    "icon": "13d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 11.36,
                "deg": 36,
                "gust": 13.31
            },
            "visibility": 785,
            "pop": 0.26,
            "snow": {
                "3h": 0.23
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-22 03:00:00"
        },
        {
            "dt": 1674367200,
            "main": {
                "temp": -0.67,
                "feels_like": -13.27,
                "temp_min": -0.67,
                "temp_max": -0.67,
                "pressure": 1039,
                "sea_level": 1039,
                "grnd_level": 1009,
                "humidity": 70,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 600,
                    "main": "Snow",
                    "description": "light snow",
                    "icon": "13d"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 11.18,
                "deg": 31,
                "gust": 12.53
            },
            "visibility": 5063,
            "pop": 0.32,
            "snow": {
                "3h": 0.12
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-22 06:00:00"
        },
        {
            "dt": 1674378000,
            "main": {
                "temp": -2.92,
                "feels_like": -15.52,
                "temp_min": -2.92,
                "temp_max": -2.92,
                "pressure": 1040,
                "sea_level": 1040,
                "grnd_level": 1010,
                "humidity": 68,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 100
            },
            "wind": {
                "speed": 8.34,
                "deg": 39,
                "gust": 12.1
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-22 09:00:00"
        },
        {
            "dt": 1674388800,
            "main": {
                "temp": -7.24,
                "feels_like": -19.82,
                "temp_min": -7.24,
                "temp_max": -7.24,
                "pressure": 1042,
                "sea_level": 1042,
                "grnd_level": 1012,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 82
            },
            "wind": {
                "speed": 5.53,
                "deg": 11,
                "gust": 8.63
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-22 12:00:00"
        },
        {
            "dt": 1674399600,
            "main": {
                "temp": -9.65,
                "feels_like": -22.25,
                "temp_min": -9.65,
                "temp_max": -9.65,
                "pressure": 1043,
                "sea_level": 1043,
                "grnd_level": 1013,
                "humidity": 73,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "clouds": {
                "all": 11
            },
            "wind": {
                "speed": 7.23,
                "deg": 324,
                "gust": 17.76
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-22 15:00:00"
        },
        {
            "dt": 1674410400,
            "main": {
                "temp": -11.13,
                "feels_like": -23.73,
                "temp_min": -11.13,
                "temp_max": -11.13,
                "pressure": 1044,
                "sea_level": 1044,
                "grnd_level": 1013,
                "humidity": 48,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 6
            },
            "wind": {
                "speed": 11.79,
                "deg": 318,
                "gust": 26.53
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-22 18:00:00"
        },
        {
            "dt": 1674421200,
            "main": {
                "temp": -12.73,
                "feels_like": -25.33,
                "temp_min": -12.73,
                "temp_max": -12.73,
                "pressure": 1043,
                "sea_level": 1043,
                "grnd_level": 1012,
                "humidity": 50,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 10.85,
                "deg": 310,
                "gust": 24.47
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2023-01-22 21:00:00"
        },
        {
            "dt": 1674432000,
            "main": {
                "temp": -13.76,
                "feels_like": -26.36,
                "temp_min": -13.76,
                "temp_max": -13.76,
                "pressure": 1044,
                "sea_level": 1044,
                "grnd_level": 1013,
                "humidity": 52,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 11.5,
                "deg": 302,
                "gust": 26.69
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-23 00:00:00"
        },
        {
            "dt": 1674442800,
            "main": {
                "temp": -6.52,
                "feels_like": -19.12,
                "temp_min": -6.52,
                "temp_max": -6.52,
                "pressure": 1042,
                "sea_level": 1042,
                "grnd_level": 1012,
                "humidity": 33,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 16.55,
                "deg": 334,
                "gust": 21.16
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-01-23 03:00:00"
        }
    ],
    "city": {
        "id": 2036341,
        "name": "Kailu",
        "coord": {
            "lat": 44.05,
            "lon": 121.31
        },
        "country": "CN",
        "population": 1000,
        "timezone": 28800,
        "sunrise": 1673997904,
        "sunset": 1674031463
    }
};




console.log(sort(parseThis));