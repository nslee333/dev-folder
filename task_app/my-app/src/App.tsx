import { useEffect } from 'react';
import './App.css';
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';
require('dotenv').config();

const client: any = new MongoClient(process.env.URI as string)

function App() {

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        
        // Call submitTask function here.
      }
    }

    // Need to fetch tasks from collection on page load.


  }, []); // Also consider reloading the tasks whenever submitTask is called.

  const submitTask = async () => {
    // Need to connect to mongoDB.
    // Need to use a mongo instance to submit task to database.
    // Try catch.

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
