import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivacynData from './PrivacynData';
import { useStateValue } from './StateProvider';

function App() {
	const [ { user } ] = useStateValue();

	return (
		<div>
			{!user ? (
				<Router>
					<Switch>
						<Route path="/privacy">
							<PrivacynData />
						</Route>
						<Route path="/">
							<Login />
						</Route>
					</Switch>
				</Router>
			) : (
				<Router>
					<div className="app">
						<Header />
						<div className="body">
							<Sidebar />
							<Feed />
							<Widgets />
						</div>
					</div>
				</Router>
			)}
		</div>
	);
}

export default App;
