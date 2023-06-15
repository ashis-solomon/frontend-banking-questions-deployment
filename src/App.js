import React from 'react';
import LeftHalf from './components/LeftHalf';
import Chatbot from './components/Chatbot';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <div className="left-half">
        <LeftHalf />
      </div>
      <div className="right-half">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
