import React from 'react';
import {  Dialog, DialogContent, Typography } from '@material-ui/core';
import { useStateValue } from '../Context/StateProvider';
import './Profile.css'; // Import the CSS file

function Profile({ open, onClose }) {
  const [{ user }] = useStateValue();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="dialog">
        <img src={user?.photoURL} alt={user?.displayName || 'User'} className="avatar" />
        <Typography variant="h6" className="username">
          {user?.displayName || 'User'}
        </Typography>
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;
