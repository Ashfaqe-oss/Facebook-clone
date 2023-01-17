import React from 'react';
import './Story.css';
import { Avatar } from '@material-ui/core';

function Story({ title, proSrc, img }) {
	return (
		<div
			className="story"
			style={{
				backgroundImage: `url(${img})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center'
			}}
		>
			<Avatar className="story__avatar" src={proSrc} />
			<h4>{title}</h4>
		</div>
	);
}

export default Story;
