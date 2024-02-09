// src/components/ChatWindow.js
import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesRef = React.createRef();


  useEffect(() => {
    // Scroll to the bottom when messages are updated
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    try {
        setMessages((messages) => [...messages, {type: 'user-message', msg: inputText}]);
      const response = await fetch('http://localhost:3001/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        // Update 'messages' state with the response using the functional form
        setMessages((messages) => [...messages, { type: 'boat-message', msg:result.reply}]);
      } else {
        console.error('Request failed with status code', response.status);
        // Print headers for debugging
        console.debug(...response.headers);
        console.debug(response.body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-window">
      {/* Display chat messages */}
      <div className="messages" ref={messagesRef}>
        {messages.map((item, index) => (
            
          <div className={`${item.type} message`} key={index}>{item.msg}</div>
        ))}
      </div>

      {/* Input area */}
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
