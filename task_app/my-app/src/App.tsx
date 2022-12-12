import React, { useEffect, RefObject, KeyboardEventHandler } from 'react';
import './App.css';
import { MongoClient } from 'mongodb';

console.log(process.env.URI)

function App() {
  const inputRef: RefObject<any> = React.createRef();


  useEffect(() => {

  }, []); // Also consider reloading the tasks whenever submitTask is called.



  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      submitTask(event);

      inputRef.current.value = ""
    }
  }


  const submitTask = async (event: any) => {
    try {
      // Need to call mongoose instance to insert document for task.
      console.log(event.target.value, "Inside submit task");


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
