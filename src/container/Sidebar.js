import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, Search } from '@material-ui/icons';
import SidebarRow from './SidebarRow';
import db, { auth } from '../config/firebase';
import { useStateValue } from '../Context/StateProvider';
import './Sidebar.css';
import Profile from './Profile'; // Import the newly created Profile component

const ITEM_HEIGHT = 54;

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const searchRef = useRef(null);
  const open = Boolean(anchorEl);


// Importing the all stored room from firestore database

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

// Here we are create a room and check input should not be empty

  const createChat = () => {
    setAnchorEl(null);
    const roomName = prompt('Enter Room Name: ');
    if (roomName?.trim()) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };


// Room deleting function

  const deleteRoom = async (roomId) => {
    try {
      // Delete all messages inside the room
      const messagesSnapshot = await db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .get();
  
      const batch = db.batch();
  
      messagesSnapshot.forEach((doc) => {
        console.log(doc);
        batch.delete(doc.ref);
        
      });
  
      await batch.commit();
  
      // Delete the room document itself
      await db.collection('rooms').doc(roomId).delete();
  
      console.log('Room and messages successfully deleted!');
    } catch (error) {
      console.error('Error deleting room and messages:', error);
    }
  };
  

  const signout = () => {
    setAnchorEl(null);
    auth.signOut();
  };

  // Function to open the Profile dialog
  const openProfile = () => {
    setProfileOpen(true);
    setAnchorEl(null); // Close the main menu after opening the Profile dialog
  };

  // Function to close the Profile dialog
  const closeProfile = () => {
    setProfileOpen(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = rooms.filter((room) =>
      room.data.name.toLowerCase().includes(query)
    );
    setFilteredRooms(filtered);
    setSearchError(filtered.length === 0); // Set search error if no results found
  };
  const removeRoomFromState = (roomId) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
  };

  return (
    <div className="sidebar">
      <Grid className="sidebar__header" container direction="row">
        <Grid className="sidebar__avatar" item sm={2}>
          <Avatar
            src={`${user?.photoURL ? user?.photoURL : ''}`}
            alt={`${user?.displayName ? user?.displayName : 'User'}`}
          />
        </Grid>
        <Grid item sm={2} />
        <Grid item sm={2} />
        <Grid container item sm={6}>
          <Grid item sm={3} />
          <Grid item sm={2} />
          <Grid item sm={2} />
          <Grid item sm={2} />
          <Grid item sm={3}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert className="sidebar__icon" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={createChat}>Create A Room</MenuItem>
              <MenuItem onClick={openProfile}>Profile</MenuItem> {/* Updated to openProfile */}
              <MenuItem onClick={signout}>Log out</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer" ref={searchRef}>
          <Search />
          <input type="text" id='search' onChange={handleSearch} placeholder="Search or Start New Chat" />
          {searchError && <p className='error'>No results found</p>}
        </div>
      </div>
      <div className="sidebar__Chats">
        {filteredRooms.length > 0 || searchError ? (
          filteredRooms.map(({ id, data }) => (
            <SidebarRow key={id} id={id} name={data?.name} onDelete={() => deleteRoom(id)}  />
          ))
        ) : (
          rooms.map(({ id, data }) => (
            <SidebarRow
              key={id}
              id={id}
              name={data?.name}
              onDelete={() => {
                deleteRoom(id);
                removeRoomFromState(id);
              }}
            />
          ))
        )}
      </div>
      {/* Render the Profile component */}
      <Profile open={profileOpen} onClose={closeProfile} />
    </div>
  );
}

export default Sidebar;
