import React, { useEffect, useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import { timeFromNow } from '../utils/utils';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import db from '../config/firebase';
import { useParams } from 'react-router-dom';
import './Message.css';

function Message({ name, message, timestamp, email, messageId }) {
  const colors = ['#128C7E', '#25D366', '#34B7F1'];
  const [{ user }] = useStateValue();
  const { roomId } = useParams();
  const [num, setNum] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteOption, setShowDeleteOption] = useState(true); // Added this line

  useEffect(() => {
    setNum(Math.floor(Math.random() * colors.length));
  }, [colors.length]);

  const handleDeleteMessage = () => {
    if (messageId) {
      // Delete the message from Firebase
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .doc(messageId)
        .delete()
        .then(() => {
          console.log('Message successfully deleted!');
          setAnchorEl(null);
        })
        .catch((error) => {
          console.error('Error deleting message:', error);
          setAnchorEl(null);
        });
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`message ${user?.email === email ? 'receiver' : ''}`}
    >
      <div className="message__content"> {/* Added a wrapper div */}
        <p className="message__name" style={{ color: colors[num] }}>
          {name}
        </p>
        {showDeleteOption && user?.email === email && (
  <IconButton onClick={handleMenuClick}>
    <MoreVert className="sidebar__icon" />
  </IconButton>
)}

      </div>
      <p>{message}</p>
      <p className="message__timestamp">{timeFromNow(timestamp)}</p>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default Message;
