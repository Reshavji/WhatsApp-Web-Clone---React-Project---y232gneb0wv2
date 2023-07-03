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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <Grid container className="sidebarRow">
        <Grid className="sidebarRow__image" item md={2} sm={2}>
          <Avatar src={messages[0]?.photoURL} />
        </Grid>
        <Grid className="sidebarRow__info" container item md={10} sm={10}>
          <Grid container item direction="column" md={8} sm={6}>
            <Grid item>
              <h3 className="sidebarRow__name">{name}</h3>
            </Grid>
            <Grid item>
              <p className="sidebarRow__message">
                {`${messages[0] ? messages[0]?.name + ': ' : ''} ${messages[0]
                  ? truncateMessage(messages[0]?.message, 3)
                  : ''}`}
              </p>
            </Grid>
          </Grid>
          <Grid item md={4} sm={6}>
            <p className="sidebarRow__time">
              {messages[0] ? timeFromNow(messages[0]?.timestamp) : ' '}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}

export default SidebarRow;
