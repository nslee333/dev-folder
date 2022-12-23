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
      await getTasks();

    } catch (error) {
      console.error(error);
    }
  }

  const deleteTask = async (objectId: string) => {
    try {
      await deleteMethod(objectId);
      await getTasks();
      
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
      <div key={document._id.toString()}>
        <li className='taskLI'>{document.task}</li>
        <button className='taskButton' onClick={(e:any) => deleteTask(document._id.toString())}>&times;</button>
      </div>
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
