import React, { useEffect, useState } from 'react';
import { Avatar, Grid } from '@material-ui/core';
import './SidebarRow.css';
import db from '../config/firebase';
import { Link } from 'react-router-dom';
import { timeFromNow } from '../utils/utils';

function truncateMessage(message, maxLength) {
  if (message.split(' ').length > maxLength) {
    const words = message.split(' ');
    return words.slice(0, maxLength).join(' ') + '...';
  }
  return message;
}

function SidebarRow({ name, id }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const latestMessage = snapshot.docs[0].data();
          setMessage(latestMessage);
        }
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <Grid container className="sidebarRow">
        <Grid className="sidebarRow__image" item md={2} sm={2}>
          <Avatar src={message?.photoURL} />
        </Grid>
        <Grid className="sidebarRow__info" container item md={10} sm={10}>
          <Grid container item direction="column" md={8} sm={6}>
            <Grid item>
              <h3 className="sidebarRow__name">{name}</h3>
            </Grid>
            <Grid item>
              <p className="sidebarRow__message">
                {`${message ? message?.name + ': ' : ''} ${
                  message ? truncateMessage(message?.message, 3) : ''
                }`}
              </p>
            </Grid>
          </Grid>
          <Grid item md={4} sm={6}>
            <p className="sidebarRow__time">
              {message ? timeFromNow(message?.timestamp) : ' '}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}

export default SidebarRow;
