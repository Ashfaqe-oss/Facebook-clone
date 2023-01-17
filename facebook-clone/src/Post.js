import React, { useState } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import axios from './axios';

function Post({ key, postId, image, profilePic, username, timestamp, message, likes, imageUrl }) {
	const [ like, setLike ] = useState(false);

	const likeFunction = () => {
		setLike(true);

		axios.put('/like/update', postId).then((res) => {
			console.log(res);
		});
	};

	const dislikeFunction = () => {
		setLike(false);

		axios.put('/dislike/update', postId).then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="post">
			<div className="post__top">
				<Avatar src={profilePic} className="__topAvatar" />
				<div className="post__topInfo">
					<h3>{username}</h3>
					<p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
				</div>
			</div>

			<div className="post__bottom">
				<p>{message}</p>
			</div>
			<div className="post__image">
				{image && (
					<img
						src={`https://facebook-backend-uo3.herokuapp.com/retrieve/image/single?name=${image}`}
						alt=""
					/>
				)}
				{imageUrl && <img src={imageUrl} alt="" />}
				{likes !== 0 && (
					<h5>
						{likes} {likes === 1 ? 'Like' : 'Likes'}
					</h5>
				)}
			</div>

			<div className="post__options">
				{like ? (
					<div className="post__option" onClick={dislikeFunction}>
						<ThumbUpIcon
							className="animate__animated animate__heartBeat"
							style={{ color: 'rgb(15, 117, 233)' }}
						/>
						<h4>Like</h4>
					</div>
				) : (
					<div className="post__option" onClick={likeFunction}>
						<ThumbUpOutlinedIcon />
						<h4>Like</h4>
					</div>
				)}

				<div className="post__option">
					<ChatBubbleOutlineRoundedIcon />
					<h4>Comment</h4>
				</div>
				<div className="post__option">
					<ShareRoundedIcon />
					<h4>Share</h4>
				</div>
			</div>
		</div>
	);
}

export default Post;
