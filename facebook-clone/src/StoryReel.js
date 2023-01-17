import React, { useState, useEffect } from 'react';
import './StoryReel.css';
import Story from './Story';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import firebase from "firebase";
import { storage } from './firebase';
import db from './firebase';
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles( ( theme ) => ( {
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing( 2, 4, 3 )
	}
} ) );

function StoryReel () {
	const [{ user }] = useStateValue();
	const classes = useStyles();
	const [open, setOpen] = React.useState( false );
	const [story, setStory] = useState( null );
	const [stories, setStories] = useState( [] );
	const handleOpen = () => {
		setOpen( true );
	};

	const handleClose = () => {
		setOpen( false );
	};

	const handleChange = ( e ) => {
		if ( e.target.files[0] ) {
			setStory( e.target.files[0] );
		}
	};

	const handleUpload = ( e ) => {
		const storyTask = storage.ref( `stories/${ story?.name }` ).put( story );

		storyTask.on( 'state_changed',
			( snapshot ) => {
				//progress not needed
				const progress = Math.round( snapshot.bytesTransferred / snapshot.totalBytes * 100 );
				alert( `${ progress }% completed` );
			},
			( error ) => {
				console.log( error );
			}, () => {
				storage.ref( 'stories' ).child( story?.name ).getDownloadURL().then( ( url ) => {
					db.collection( 'stories' ).add( {
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						imageUrl: url,
						username: user.displayName,
						ProfilePic: user.photoURL
					} );
				} );
			} );

		setOpen( false );
		setStory( null );
	};

	useEffect( () => {
		db.collection( "stories" )
			.orderBy( "timestamp", "desc" )
			.onSnapshot( ( snapshot ) => {
				setStories(
					snapshot.docs.map( ( doc ) => ( {
						id: doc.id,
						storyData: doc.data()
					} ) )
				);
			} );
	}, [] );

	return (
		<div className="str">
			<div className="storyReel">
				{stories.map( ( { id, storyData } ) => (
					<Story
						title={storyData.username}
						proSrc={storyData.profilePic}
						img={storyData.imageUrl}
					/>
				) )}

			</div>
			<div className="__uploadStory">
				<button type="button" onClick={handleOpen}>
					Add Stories
				</button>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500
					}}
				>
					<Fade in={open}>
						<div className={classes.paper}>

							<h2 id="transition-modal-title">Upload Stories</h2>

							<input type="file" className="__uploadStoryInput" onChange={handleChange} placeholder="choose photos" id="transition-modal-description" />
							<button className="__uploadStoryButton" onClick={handleUpload}>Upload</button>

						</div>
					</Fade>
				</Modal>
			</div>
		</div >
	);
}

export default StoryReel;
