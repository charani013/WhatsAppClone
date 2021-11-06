import React,{useEffect,useState} from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      
      setMessage(response.data);
    })
  }, []);



  useEffect(() => {
    const pusher = new Pusher('cec4fc47563484aeefdf', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      
      setMessage([...messages,newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe()
    }

  }, [messages]);

  console.log(messages);
  
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
