import React, { useState, useRef, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, message]);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever chatHistory changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      <div className='chat-container' ref={chatContainerRef}>
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <React.Fragment key={index}>
              <div className='message-container'>
                <span className="message">{msg}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="input-container" id="inputContainer">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <MicIcon sx={{ fontSize: 30 }}/>
      </div>
    </>
  );
};

export default ChatBox;
