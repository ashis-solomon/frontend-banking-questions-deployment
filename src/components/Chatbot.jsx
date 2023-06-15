import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const API_URL = 'https://testapp-9601.onrender.com/api/predict/';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: 'Welcome to the BankingBot!',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      message: 'What may I assist you with?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [currentModel, setCurrentModel] = useState('svm');
  const validModels = ['adaboost', 'svm', 'naive_bayes', 'gradient_boosting', 'random_forest'];

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        message: 'Welcome to the BankingBot!',
        sender: 'bot',
        timestamp: new Date(),
      },
      {
        id: '2',
        message: 'What may I assist you with?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setCurrentModel('svm');
  };

  const handleMessageSubmit = async (newMessage) => {
    if (newMessage.trim() === '') return; // Check if message is empty

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: newMessage,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    if (newMessage.toLowerCase() === 'model status') {
      const currentModelMessage = `Current model: ${currentModel}.`;
      const availableModelsMessage = `Available models:\n${validModels
        .map((model, index) => `${index + 1}. ${model}`)
        .join('\n')}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          message: currentModelMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
        {
          id: prevMessages.length + 3,
          message: availableModelsMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    if (newMessage.toLowerCase().startsWith('model ')) {
      const inputArr = newMessage.split(' ');
      if (inputArr.length >= 2) {
        const newModel = inputArr[1];
        if (validModels.includes(newModel)) {
          setCurrentModel(newModel);
          const botMessage = `Model switched to ${newModel}.`;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 2,
              message: botMessage,
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
          return;
        } else {
          const botMessage = `Invalid model name. Currently using ${currentModel} model.`;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 2,
              message: botMessage,
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
          return;
        }
      }
    }

    try {
      const response = await axios.post(API_URL, {
        model_name: currentModel,
        text: newMessage,
      });

      const botMessage = response.data.message;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          message: botMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const chatHistory = document.getElementById('chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div id="chat-history" className="chat-history">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <span>{message.message}</span>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="chatbot-controls">
        <button className="clear-chat-button" onClick={handleClearChat}>
          Clear Chat
        </button>
      </div>
      <form
        className="chatbot-form"
        onSubmit={(e) => {
          e.preventDefault();
          const newMessage = e.target.elements.messageInput.value;
          handleMessageSubmit(newMessage);
          e.target.reset();
        }}
      >
        <input
          type="text"
          className="chatbot-input"
          name="messageInput"
          placeholder="Type a message..."
        />
        <button type="submit" className="chatbot-submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotComponent;
