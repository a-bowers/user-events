import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../AuthButtons/LoginButton';
import LogoutButton from '../AuthButtons/LogoutButton'

import "./Header.scss";

function App() {
	const { isAuthenticated } = useAuth0();
	return (
		<header className="App-header">
			<h1 className="Title">First Kanaloan Bank</h1>
			<div className="Spacer" />
			{isAuthenticated ? <LogoutButton /> : <LoginButton />}
		</header>
	);
}

export default App;
