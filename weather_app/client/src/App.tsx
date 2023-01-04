import './App.css';

console.log(window.innerWidth, window.innerHeight)

// TODO: Add useEffect => Request data on page load.




function realtime() {
  // TODO: Call data.
  // TODO: Get date, and display below.
  // TODO: Center text. :-)



  return (
    <div className='realtimeMain'>
      <h1 className='realtimeh1'>ICON 72* Cloudy</h1>  
      <h1 className='realtimeh1'>5:41pm</h1>
      <h2 className='realtimeh2'>Tuesday, January 4th 2023</h2>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <div className='forecastDiv'></div>
      <div className='navBar'></div>
        {realtime()}
      <div className='hourForecast'></div>
    </div>
  );
}

export default App;
// 1152 x 1920
