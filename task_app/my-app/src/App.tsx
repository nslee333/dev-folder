import React, { useEffect, RefObject, useState, SyntheticEvent } from 'react';
import './App.css';
import {getMethod, postMethod, deleteMethod} from "./actions/actions";
import {ObjectId} from 'mongodb';


type taskDocument = {
  _id: ObjectId,
  task: string
}

function App(): JSX.Element {
  const [documents, setDocuments] = useState<taskDocument[]>([]);
  const inputRef: RefObject<HTMLInputElement> = React.createRef();


  useEffect(() => {
    getTasks();
    
  }, []);

  const getTasks: () => Promise<void> = async (): Promise<void> => {
    const responseObject: any = await getMethod();
    const taskArray: taskDocument[] = responseObject.data.collection;
    
    setDocuments(taskArray);
  }

  console.log(typeof Event, "event type")
  const keyDownHandler: (event: SyntheticEvent) => void = (event: SyntheticEvent) => {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      
      submitTask(event);

      if (inputRef.current === null) {
        return console.error("InputRef Error:", inputRef.current);
      }

      inputRef.current.value = ""
    }
  }


  const submitTask: (event: any) => Promise<void> = async (event: any) => {
    if (event.target.value.length > 75) return window.alert("Task length too long. Please try again.");

    try {
      await postMethod(event.target.value);
      await getTasks();

    } catch (error) {
      console.error(error);
    }
  }

  const deleteTask: (objectId: string) => Promise<void> = async (objectId: string) => {
    try {
      await deleteMethod(objectId);
      await getTasks();
      
    } catch (error) {
      console.error(error);
    }
  }

  function taskWindow(): JSX.Element {
    return (
      <div>
        <div>
          <input type='text' className='taskInput' onKeyDown={keyDownHandler} ref={inputRef} placeholder='Schedule Dentist Appointment...'/>
        </div>
        <div className='taskBox'>
        <>
          {task(documents)}
        </>
        </div>
      </div>
    );
  }

  function task(task: taskDocument[]): JSX.Element { 
    const listItems: JSX.Element[] = task.map(document => (
      document.task.length >= 37  ? 
    (
      <div key={document._id.toString()} className='taskDiv'>
        <li className='taskListSmallText'>{document.task}</li>
        <button className='taskDeleteButtonSmallText' onClick={(e:any) => deleteTask(document._id.toString())}>&times;</button>
      </div>
    ) : (
      <div key={document._id.toString()} className='taskDiv'>
        <li className='taskList'>{document.task}</li>
        <button className='taskDeleteButton' onClick={(e:any) => deleteTask(document._id.toString())}>&times;</button>
      </div>
    )
      
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
