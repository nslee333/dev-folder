Weather web app:
    User authentication
      - Saves user preferences.

    Main page:
        Weather of Current city
        The day's forecast
        air conditions?
        7 day forecast.
        Background / Theme changes based upon the current weather?
    Cities:
        - List of cities user has added.
          - city name, temp, time and icon?
          - Select city shows up more information.
        - Search for city to add.
    Map:
        - Weather map of area?
    Options:
        -  Fahrenheit vs Celsius option.
        -  Pressures? etc.

[Tools and libraries used]
  - React
  - Axios
  - Typescript

  - Express
  - Axios
  - Typescript
  - OpenWeatherMap API.

[WrapUp]:
    - Proofread and Refactor all code.
    - Remove all debugger logs.
    - Remove all unused imports.
    - Remove all unused dev or main dependencies.
    - Remove all `any` typings
    - Comment documentation above function declarations.
      - Note: Need to research common conventions for this.
      - @param paramName its use
      - @param param
    - Remove all unused data from api calls.
    - Refactor CSS, put css classes with each other parent => child => etc.
    - Define types outside of App or Inside?
    - Label and Group all state hooks.



[Completed]:
    1. Client and Server folders initialized.
    2. Set up Axios http requests skeleton.
    3. Set up server skeleton.
    4. Set up API http methods skeleton with Axios
    5. Research and gather what APIs I need.
    6. Learning to call weatherAPI with postman
    7. Need to figure out to call specific locations.
    8. Swap out api.ts with new api.
    9. Bug #2: weekly sort only returning 3 days, should be returning.
    10. Bug #3: Hourly sort getting hung up.
    11. Bug #4: Server crash issue.
    12. Bug #5 fix - removed module.exports, ESM module error.
    13. hourly + realtime requests - add weather icon numbers.
    14. Displaying data for realtime
    15. Build navbar component
    16. Make h1, h2 to be a semi-bold or light font-weight.
    17. Hour forecast component clean up.
    18. Swap * with degree symbol
    19. Settings variable page done.
    20. Hour forecast hr bars
    21. Implement a freeze on all request functions.
    22. Implement a way to save copies of data automatically.
    23. Implement cooldown().
    24. Fixed 503 Error, is it coming from effect, or my backend application...
      25. Implemented a cooldown to make sure I don't call the api too often.
    25. Swap out symbol with a city - switch variable names => city -> cities.
    26. Display daily forecast.
    27. Hour forecast not updating, fixed.
    28.  Display data for City tab.
         1.   WeatherICON added, need to display on renderCities.
    29. Update http methods => request => res => [Follow convention]
    30. Rewrite iconFetch.
    31. Fix, 0 based indexing bug. Home component isn't rendering
    32. Need to sustain default location and savedCities between renders.
    33. Weather Icons
    34. Hour forecast not updating, cooldown faulty?
    35. Find a way to preload temperature values before everything else is loaded.
    36. Test location and metric work fine.
    37. Update realtime => current
    38. Cleaned up App.css
    39. Remove all unused data from api calls.
    40. Refactor CSS, put css classes with each other parent => child => etc.
    41. Remove all unused dev or main dependencies.
    42. Remove all unused imports.
    43. Remove all `any` typings.
    44. Label and Group all state hooks.
    45. Remove all debugger logs.
    46. Comment documentation above function declarations.
        1.   Brief overview of what it does.
    47. Figure out if processForecastWeather is returning the right data.
        1.  Issue with my algorithm gathering the data I needed.
    48. Refactor App.tsx.
        1.  Extract functions



[Medium-term]
    - Integrate with GH actions.
    - Performance testing.
    - Web security analysis


[ImmediateTasks]:
  - Build unit tests for client-side, server side.
  - Put note in readme about OpenWeatherMap not working properly.



[Working]:















Clean up general todo list.
- Remove all debugger logs.
    - Remove all unused imports.
    - Remove all unused dev or main dependencies.
    - Remove all `any` types
    - Comment documentation above function declarations.
      - Note: Need to research common conventions for this.
      - @param paramName its use
      - @param param













[Next Project Notes]:
  - Billable hours log.
  - Create a style guide, and stick to it.
    - Max line-length.
  - When a task is completed:
    - Make sure that the function has a good name - i.e. one that describes the function.
    - Type the functions for that task that was completed.
    - Make sure that the variables stick to the naming convention.
    - A variable line doesn't go past the max-line length.

