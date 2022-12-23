import React, { useEffect, RefObject, KeyboardEventHandler } from 'react';
import './App.css';
import {getMethod, postMethod, deleteMethod} from "./actions/actions";
import {ObjectId} from 'mongodb';
import {useState} from 'react';


type taskDocument = {
  _id: ObjectId,
  task: string
}


function App() {
  const [documents, setDocuments] = useState<taskDocument[]>([]);

  const inputRef: RefObject<any> = React.createRef();


  useEffect(() => {
    getTasks();
    
  }, []);

  
  
  

  const getTasks = async (): Promise<void> => {
    const responseObject: any = await getMethod();
    const taskArray: taskDocument[] = responseObject.data.collection;
    
    setDocuments(taskArray);
  }


  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      submitTask(event);

      inputRef.current.value = ""
    }
  }


  const submitTask = async (event: any) => {
    try {
      await postMethod(event.target.value);
      getTasks();

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
        <>
          {task(documents)}
        </>
        </div>
      </div>
    );
  }

  function task(task: taskDocument[]) { 
    const listItems = task.map(document => (
      // <li key={document._id.toString()} className='taskLI'><button className='taskButton'>{document.task}</button></li>
      <li key={document._id.toString()} className='taskLI'>{document.task}</li>
    ));

    
    return (
      <>
        <ul className='taskUL'>{listItems}</ul>
      </>
    );
  }


// & Note
// TODO:
// ! RED
// ? QUESTION:
// ^ Markup


  return (
    <div className="App">
      {taskWindow()}
    </div>
  );
}

export default App;
