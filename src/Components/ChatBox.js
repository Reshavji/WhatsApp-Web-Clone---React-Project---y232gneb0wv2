import React, { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, message]);
      setMessage('');
    }
  };

  return (
    <>
    <div className='chat-container'>
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <React.Fragment key={index}>
            <div className='message-container'>
            <span className="message">{msg}</span></div>
          </React.Fragment>
        ))}
      </div></div>
      <div className="input-container" id="inputContainer">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};

export default ChatBox;
