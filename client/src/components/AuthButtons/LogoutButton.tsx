import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
	const { logout, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Button
				className="AuthButton"
				onClick={() =>
					logout({
						returnTo: window.location.origin, //TODO return to main page if on an authenticated page, otherwise the same page
					})
				}
			>Log out</Button>
		</>
	);
}

export default LogoutButton;
