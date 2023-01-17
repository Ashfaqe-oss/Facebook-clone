import React from 'react';
import './SidebarRow.css';
import { Avatar } from '@material-ui/core';

function SidebarRow({ src, Icon, title }) {
	return (
		<div className="sidebarRow">
			<div className="sbRow">
				{src && <Avatar src={src} />}

				{Icon && <Icon />}
				<h4>{title}</h4>
			</div>
		</div>
	);
}

export default SidebarRow;
