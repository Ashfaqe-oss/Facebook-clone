import React from 'react';
import './Header.css';
import GamepadIcon from '@material-ui/icons/Gamepad';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MessageIcon from '@material-ui/icons/Message';
import { Avatar, Icon, IconButton, Button } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { auth } from './firebase';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

function Header() {
	const [ { user }, dispatch ] = useStateValue();

	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const signOut = () => {
		auth.signOut().then(() => {
			dispatch({
				type: 'SET_USER',
				user: null
			});
		});
	};

	return (
		<div className="header">
			<div className="header__left">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_Logo_%28with_gradient%29.svg/1200px-Facebook_f_Logo_%28with_gradient%29.svg.png"
					alt=""
					className="__leftLogo"
				/>
			</div>

			<div className="header__input">
				<Icon>
					<SearchIcon className="search" />
				</Icon>
				<input type="text" placeholder="Search Facebook" />
			</div>

			<div className="header__middle">
				<Button className="__middleIcon">
					<HomeIcon fontSize="large" />
				</Button>

				<Button className="__middleIcon">
					<PeopleOutlineIcon />
				</Button>

				<Button className="__middleIcon">
					<LiveTvIcon />
				</Button>

				<Button className="__middleIcon">
					<SupervisedUserCircleIcon />
				</Button>

				<Button className="__middleIcon">
					<GamepadIcon />
				</Button>
			</div>

			<div className="header__right">
				<div>
					<div
						className="__rightAvatar"
						aria-describedby={id}
						variant="contained"
						color="primary"
						onClick={handleClick}
					>
						<Avatar sizes="small" src={user.photoURL} />
						<h6>{user.displayName}</h6>
					</div>

					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left'
						}}
					>
						<Typography className={classes.typography}>
							<button className="__headerRightLogout" onClick={signOut}>
								logout
							</button>
						</Typography>
					</Popover>
				</div>

				<IconButton>
					<AddIcon />
				</IconButton>
				<IconButton>
					<MessageIcon />
				</IconButton>
				<IconButton>
					<NotificationsIcon />
				</IconButton>
				<IconButton>
					<ExpandMoreIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default Header;
