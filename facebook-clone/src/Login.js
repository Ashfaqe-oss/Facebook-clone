import React, { useEffect } from 'react';
import './Login.css';
import { auth, provider } from './firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Login() {
	const [ { user }, dispatch ] = useStateValue();

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					//user logged in
					//console.log(authUser);
					dispatch({
						type: 'SET_USER',
						user: authUser
					});
				} else {
					//user logged out
					dispatch({
						type: 'SET_USER',
						user: null
					});
				}
				//console.log( authUser );
			});

			return () => {
				//perform some clean up action
				unsubscribe();
			};
		},
		[ user, dispatch ]
	);

	const login = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: 'SET_USER',
					user: result.user
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__logo">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_Logo_%28with_gradient%29.svg/1200px-Facebook_f_Logo_%28with_gradient%29.svg.png"
					alt=""
					className="__logo1"
				/>

				<img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="" className="__logo2" />
			</div>
			<div className="login__policy">
				<Link to="/privacy" style={{ color: 'rgb(190, 217, 248)', margin: '0 15px' }}>
					<p>privacy policy</p>
				</Link>

				<Link to="/privacy" style={{ color: 'rgb(190, 217, 248)', margin: '0 15px' }}>
					<p>data deletion</p>
				</Link>
			</div>

			<button onClick={login}>Sign In</button>
		</div>
	);
}

export default Login;
