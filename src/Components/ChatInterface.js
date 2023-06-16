import React, { useState } from 'react';
import ChatBox from './ChatBox';
import Contactbox from "./Contactbox";
import CampaignIcon from '@mui/icons-material/Campaign';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const ChatInterface = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleNewGroupClick = () => {
    setShowNewGroup(true);
    setShowOptions(false);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = () => {
    // Add the new group name to the groups array
    setGroups([...groups, groupName]);

    // Reset states
    setShowNewGroup(false);
    setGroupName('');
  };

  return (
    <div className="container">
      <div id='chatcontainer'>
        <div className="grid-container">
          <div className="grid-item">
            <div className="header">
              <img src="https://static-prod.adweek.com/wp-content/uploads/2023/01/WhatsApp-Avatar-Profile-Photo-Hero-652x367.png" alt="user" />
              <div className="iconcontainer">
                <CampaignIcon sx={{ fontSize: 30 }} />
                <DataUsageIcon sx={{ fontSize: 30 }} />
                <ChatIcon sx={{ fontSize: 30 }} />
                {showOptions && (
                  <div className="options-box">
                    <div className="option" onClick={handleNewGroupClick}>New Group</div>
                    <div className="option">Profile</div>
                    <div className="option">Catalog</div>
                    <div className="option">Settings</div>
                  </div>
                )}
                <MoreVertIcon onClick={handleOptionsClick} sx={{ fontSize: 30 }} />
              </div>
            </div>
            {showNewGroup && (
              <div className="new-group-box">
                <input type="text" placeholder="Enter Group Name" value={groupName} onChange={handleGroupNameChange} />
                <button onClick={handleCreateGroup}>Create</button>
              </div>
            )}
            <Contactbox groups={groups} />
          </div>
          <div className="grid-item">
            <div className="header">
              <img src="https://static-prod.adweek.com/wp-content/uploads/2023/01/WhatsApp-Avatar-Profile-Photo-Hero-652x367.png" alt="user" />
              <div className="iconcontainer">
                <SearchIcon sx={{ fontSize: 30 }} />
                <MoreVertIcon sx={{ fontSize: 30 }} />
              </div>
            </div>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface;
