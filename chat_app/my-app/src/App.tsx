import {useState, useEffect} from 'react';
import {initializeApp} from 'firebase/app'
import firebase from "firebase";
import {getFirestore} from "firebase/firestore";

import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCwZAhY6B2Q2ayN6Z5MHMsNBjuenw8EqBo",
  authDomain: "chat-app-b6c23.firebaseapp.com",
  projectId: "chat-app-b6c23",
  storageBucket: "chat-app-b6c23.appspot.com",
  messagingSenderId: "137185804332",
  appId: "1:137185804332:web:2ebfe6c30a06608069d189",
  measurementId: "G-455ZKNRCYJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


function App() {  
  const [draft, setDraft] = useState("");


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleSubmit call")
  }


  function chat_window() {
    return (
      <div className='chat-window'>
        <div className='chat-messages-window'>
          // Display current messages
        </div>
        <form>
          <input
            placeholder='Enter a message' 
            className='input-message'
            onChange={e => setDraft(e.target.value)}
            />
            <button type='submit' className='send-btn' onClick={async (e) => handleSubmit(e)}>Send</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        {chat_window()}
      </div>
    </div>
  );
}

export default App;
