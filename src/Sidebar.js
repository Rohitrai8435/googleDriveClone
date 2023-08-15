import React, { useState } from 'react';
import { storage, db } from "./firebase";
import firebase from "firebase";
import AddIcon from '@mui/icons-material/Add';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';

import "./CSS/sidebar.css"
import { Modal } from '@mui/base';



export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = (event) => {
    event.preventDefault()
    setUploading(true);
    storage.ref(`files/${file.name}`).put(file).then((snapshot) => {

      storage.ref('files').child(file.name).getDownloadURL().then(url => {
        db.collection("myfiles").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          filename: file.name,
          fileURL: url,
          size: snapshot._delegate.bytesTransferred
        })
        setUploading(false);
        setFile(null);
        setOpen(false);
      })
    })
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal_pop">
          <form
          > 
            <div className="modalBody">
              {
                uploading ? (<><h3>Your file is uploading</h3><div className='uploading'><p >uploading</p></div></>) : (
                  <><div className="modalHeading">
                  <h3>Select file you want to upload</h3>
                </div>
                    <input type="file" name='' onChange={handleChange} />
                    <input type="submit" className='post_submit' onClick={handleUpload} />
                  </>
                )
              }
            </div>
          </form>
        </div>
      </Modal>
      <div className='sidebar'>
        <div className="sidebar_btn">
          <button onClick={handleOpen}>
            <AddIcon />
            <span>new</span>
          </button>
        </div>
        <div className="sidebar_optiops">
          <div className="sidebar_option sidebar_option-Active">
            <MobileScreenShareIcon />
            <span><b>My drive</b></span>
          </div>
          <div className="sidebar_option">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="sidebar_option">
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </div>
          <div className="sidebar_option">
            <QueryBuilderIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar_option">
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </div>
          <div className="sidebar_option">
            <DeleteOutlineOutlinedIcon />
            <span>Trace</span>
          </div>
        </div>
        <hr />
        <div className="sidebar_optiops">
          <div className="sidebar_option">
            <CloudQueueOutlinedIcon />
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>6.45 GB of 15 GB used</span>
          </div>
        </div>
      </div>
    </>
  )
}
