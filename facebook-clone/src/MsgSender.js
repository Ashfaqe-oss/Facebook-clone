import React, { useState } from 'react';
import './MsgSender.css';
import { Avatar, Button, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useStateValue } from './StateProvider';
import SendIcon from '@material-ui/icons/Send';
import axios from "./axios";
import FormData from "form-data";
import CloseIcon from '@material-ui/icons/Close';

function MsgSender () {
  const [mind, setMind] = useState( '' );
  const [imageUrl, setImageUrl] = useState( '' );
  const [imageChoose, setImageChoose] = useState(null);
  const [{ user }] = useStateValue();
  const [i, setI] = useState( true );
  const [e, setE] = useState( true );
  const [disabled, setDisabled] = useState(true);


  const handleChoose = (e) => {
    setImageChoose( e.target.files[0] );
    setI( false ); 
  }
                                                                                                                                    
  const msgSubmit = async ( e ) => {
    e.preventDefault();

    if ( imageChoose && !imageUrl) {
      const imgForm = new FormData()
      imgForm.append( 'file', imageChoose, imageChoose.name );

      axios.post( '/upload/image', imgForm, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${ imgForm._boundary }`,
        }
      } ).then( ( res ) => {
        

        const postData = {
          message: mind,
          profilePic: user.photoURL,
          image: res.data.filename,
          username: user.displayName,
          timestamp: Date.now(),
          likes: 0
        };
        
        savePost( postData );
      } );
    } else if (!imageChoose && imageUrl) {
        const postData = {
        message: mind,
        imageUrl: imageUrl,
        username: user.displayName,
        profilePic: user.photoURL,
        timestamp: Date.now(),
        likes: 0
      }

      savePost(postData);
    }
    else if (!imageChoose && !imageUrl) {
      const postData = {
        message: mind,
        username: user.displayName,
        profilePic: user.photoURL,
        timestamp: Date.now(),
        likes: 0
      }

      
      savePost(postData);
    }


    setImageChoose(null);
        setMind( '' );
    setImageUrl( '' );
  };

  const savePost = async ( postData ) => {
    await axios.post( '/upload/post', postData ).catch( ( err ) => {
      if ( err ) {
        console.log( err );
      }
    } );
  };

  function truncate ( str, n ) {
    return str?.length > n ? str.substr( 0, n - 1 ) + "?" : str;
  }

  return (
    <div className="msgSender">
      <div className="msgSender__top">
        <Avatar sizes="small" src={user.photoURL} />
        <form className="__topForm">
          <div className="__topForm1">

            <input
              value={mind}
              onChange={( e ) => {setMind( e.target.value ); setDisabled(false)}}
              placeholder={truncate( `What's on your mind ${ user.displayName }`, 29 )}
              type="text"
              className="input1"
            />

            <Button onClick={msgSubmit} disabled={disabled} type="submit">
              <SendIcon />
            </Button>
          </div>
          <div className="__topForm2">
            {i &&
              <>
                <input
                  value={imageUrl}
                  onChange={( e ) => { setImageUrl( e.target.value ); setE( false ); }}
                  className="input2"
                  placeholder="Image URL (optional)"
                />
                {!e && <IconButton style={{cursor: 'pointer'}} onClick={() => { setImageUrl(""); setE( true );}}><CloseIcon /></IconButton>}
              </>
            }

            {i && e && <p>/</p>}

            {e &&
              <>
                <input
                  type="file"
                  size="30"
                  onChange={handleChoose}
                  className="input3"
                  placeholder="Choose Image (optional)"
                />
                {!i && <IconButton style={{cursor: 'pointer'}} onClick={() => { setImageChoose(null); setI( true );  }} ><CloseIcon/></IconButton>}
              </>
            }

          </div>
          <div>
          </div>
          <button onClick={msgSubmit} type="submit">
            hidden Submit
          </button>

        </form>

      </div>

      <div className="msgSender__bottom">
        <div className="__bottomOption">
          <VideocamIcon style={{ color: 'red' }} />
          <h3>Live Video</h3>
        </div>
        <div className="__bottomOption">
          <PhotoLibraryIcon style={{ color: 'green' }} />

          <h3>Photo/ Video</h3>
        </div>
        <div className="__bottomOption">
          <InsertEmoticonIcon style={{ color: 'yellow' }} />
          <h3>Feeling/ Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MsgSender;

    

//    if ( !imageChoose && mind ) {
//      db.collection( "posts" ).add( {
//        message: mind,
//        profilePic: user.photoURL,
//        image: imageUrl,
//        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//        username: user.displayName,
//        likes: 0
//      } );
//    }
