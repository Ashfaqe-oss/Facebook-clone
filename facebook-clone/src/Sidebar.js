import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MemoryIcon from '@material-ui/icons/Memory';
import SaveIcon from '@material-ui/icons/Save';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import StorefrontIcon from '@material-ui/icons/Storefront';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from './StateProvider';

function Sidebar() {
	const [ { user } ] = useStateValue();

	return (
		<div className="sidebar">
			<SidebarRow src={user.photoURL} title={user.displayName} />
			<SidebarRow title="COVID-19 Information Center" Icon={LocalHospitalIcon} />
			<SidebarRow title="Find Friends" Icon={PeopleIcon} />
			<SidebarRow title="Groups" Icon={SupervisedUserCircleIcon} />
			<SidebarRow title="Videos" Icon={VideoLibraryIcon} />
			<SidebarRow title="Events" Icon={StorefrontIcon} />
			<SidebarRow title="Memories" Icon={MemoryIcon} />
			<SidebarRow title="Saved" Icon={SaveIcon} />
			<SidebarRow title="Pages" Icon={EmojiFlagsIcon} />
			<SidebarRow title="See more" Icon={ExpandMoreIcon} />
		</div>
	);
}

export default Sidebar;
