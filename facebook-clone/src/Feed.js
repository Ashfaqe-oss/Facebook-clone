import React, { useState, useEffect } from 'react';
import './Feed.css';
import StoryReel from './StoryReel';
import MsgSender from './MsgSender';
import Post from './Post';
import axios from './axios';
import Pusher from 'pusher-js';

function Feed() {
	const [ mongoPosts, setMongoPosts ] = useState([]);

	const syncFeed = () => {
		axios.get('/retrieve/posts').then((res) => {
			setMongoPosts(res.data);
		});
	};

	useEffect(
		() => {
			syncFeed();
		},
		[ mongoPosts ]
	);

	useEffect(() => {
		const pusher = new Pusher('1b857f51315956e46810', {
			cluster: 'ap2'
		});

		const channel = pusher.subscribe('posts');
		channel.bind('inserted', function(data) {
			syncFeed(data);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, []);

	return (
		<div className="feed">
			<StoryReel />
			<MsgSender />

			{mongoPosts.map((post) => (
				<Post
					key={post._id}
					postId={post._id}
					message={post.message}
					timestamp={post.timestamp}
					username={post.username}
					image={post.image}
					imageUrl={post.imageUrl}
					profilePic={post.profilePic}
					likes={post.likes}
				/>
			))}
		</div>
	);
}

export default Feed;

/*
    db.collection( 'posts' ).orderBy( 'timestamp', 'desc' ).onSnapshot( ( snapshot ) => {
      setPosts(
        snapshot.docs.map( ( doc ) => ( {
          id: doc.id,
          post: doc.data()
        } ) )
      );
    } );
*/
