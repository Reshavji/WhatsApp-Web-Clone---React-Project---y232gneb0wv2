import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Send, Mood } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import './Chat.css';
import Message from './Message';
import db from '../config/firebase';
import { useStateValue } from '../Context/StateProvider';
import firebase from 'firebase';
import useMutationObserver from '@rooks/use-mutation-observer';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();
  const messageRef = useRef();
  const iconStyle = {
    color: '#00a884',
    fontSize: 30,
  };

  useMutationObserver(messageRef, () => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  });

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add({
          name: user?.displayName,
          email: user?.email,
          message: input,
          photoURL: user?.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => setInput(''))
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  const emojiHandler = (e, emoji) => setInput((prevInput) => prevInput + emoji.emoji);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={messages[messages.length - 1]?.data?.photoURL} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>online</p>
        </div>
        <div className="chat__headerIcons"></div>
      </div>
      <div className="chat__body" ref={messageRef}>
        {messages.map(({ id, data }) => (
          <Message
            key={id}
            messageId={id} // Pass the message id as a prop to the Message component
            name={data.name}
            email={data.email}
            message={data.message}
            timestamp={data.timestamp}
          />
        ))}
      </div>
      <div className={`chat__emojiPicker ${clicked ? 'show' : ''}`}>
        <EmojiPicker onEmojiClick={emojiHandler} />
      </div>
      <div className="chat__footer">
        <IconButton onClick={() => setClicked((clicked) => !clicked)}>
          <Mood className="chat__footerMood" />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button style={{ display: 'none' }} onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <IconButton onClick={sendMessage} >
          <Send className="chat__footerMic" style={iconStyle} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
