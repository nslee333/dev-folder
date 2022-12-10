import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitTask();
        
        // Call submitTask function here.
      }
    }

    // Need to fetch tasks from collection on page load.


  }, []); // Also consider reloading the tasks whenever submitTask is called.

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
          <input type='text' className='taskInput'/>
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
