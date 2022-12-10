import React, { useEffect, RefObject } from 'react';
import './App.css';

function App() {
  const inputRef: RefObject<any> = React.createRef();


  useEffect(() => {

  }, []); // Also consider reloading the tasks whenever submitTask is called.

  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      submitTask();

      inputRef.current.value = ""
    }
  }

  const submitTask = async () => {
    try {
      console.log("Enter pressed and task submitted ")
      
    } catch (error) {
      console.error(error);
    }

  }

  function taskWindow() {
    return (
      <div>
        <div>
          <input type='text' className='taskInput' onKeyDown={keyDownHandler} ref={inputRef}/>
        </div>
        <div className='taskBox'>
          // Display current tasks here
        </div>
      </div>
    );
  }




  return (
    <div className="App">
      {taskWindow()}
    </div>
  );
}

export default App;
