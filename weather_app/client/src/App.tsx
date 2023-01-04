import React from 'react';
import logo from './logo.svg';
import './App.css';

console.log(window.innerWidth, window.innerHeight)

function App() {
  return (
    <div className='App'>
      <div className='forecastDiv'></div>
      <div className='navBar'></div>
      <div className='realtimeDiv'>
        <h2>Forecast 2022</h2>
        <h1>Forecast 2022</h1>
      </div>
      <div className='hourForecast'></div>
    </div>
  );
}

export default App;
// 1152 x 1920
