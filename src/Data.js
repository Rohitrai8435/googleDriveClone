import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./CSS/data.css"
import { db } from './firebase';



export default function Data() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    db.collection('myfiles').onSnapshot(snapshot => {
      setFiles(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  })

  function formatBytes(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let index = 0;

    while (bytes >= 1024 && index < units.length - 1) {
        bytes /= 1024;
        index++;
    }

    return `${bytes.toFixed(2)} ${units[index]}`;
}

  return (
    <div className='data'>
      <div className="data_header">
        <div className="data_headerLeft">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="data_headerRight">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="data_content">
        <div className="data_grid">
          {
            files.map(file => {
              return <div className="data_file">
                <InsertDriveFileOutlinedIcon />
                <div className="fileName">
                <p>{file.data.filename}</p>
                </div>
              </div>
            })
          }


        </div>
        <div className="data_list">
          <div className="detailsRow">
            <p><b>name</b><ArrowDownwardIcon /></p>
            <p><b>onwer</b></p>
            <p><b>Last Modified</b></p>
            <p><b>File Size</b></p>
          </div>
          {
            files.map(file => {
              return <div className="detailsRow">
                <p>{file.data.filename}<InsertDriveFileOutlinedIcon /></p>
                <p>Me</p>
                <p>{new Date(file.data.timestamp?.seconds *1000).toUTCString()}</p>
                <p>{formatBytes(file.data.size)}</p>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}





