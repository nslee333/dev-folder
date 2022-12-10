import React, { useEffect, RefObject, KeyboardEventHandler } from 'react';
import './App.css';

function App() {
  const inputRef: RefObject<any> = React.createRef();


  useEffect(() => {

  }, []); // Also consider reloading the tasks whenever submitTask is called.

  // type  = {
  //   preventDefault: () => {};
  //   key: string;
  //   target: object;

  // }

  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // console.log(event.target.value);
      console.log(typeof event.target)
      
      submitTask();

      inputRef.current.value = ""
    }
  }

  console.log("homo"); 

  const submitTask = async () => {
    try {
      console.log("Enter pressed and task submitted ")
      console.log()
      
    } catch (error) {
      console.error(error);
    }

  }

  function taskWindow() {
    return (
      <div>
        <div>
          <input type='text' className='taskInput' onKeyDown={keyDownHandler} ref={inputRef} />
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
