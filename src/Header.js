import React from 'react'
import "./CSS/header.css"
import googleDriveIcon from './Image/googleDriveIcon.png'
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';

export default function Header({photoURL}) {
  return (
    <div className='header'>
      <div className="header_logo">
        <img src={googleDriveIcon} alt="" />
        <span>Drive</span>
      </div>
      <div className="header_search">
        <SearchIcon/>
        <input type="text" name="" id=""  placeholder='Search in Drive'/>
        <FormatAlignCenterIcon/>
      </div>
      <div className="header_icons">
        <span>
            <HelpOutlineIcon/>
            <SettingsIcon/>
        </span>
        <span>
        <AppsIcon/>
        <Avatar src={photoURL}/>
        </span>
      </div>
    </div>
  )
}
