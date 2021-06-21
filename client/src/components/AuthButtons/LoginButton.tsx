import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
	const { loginWithRedirect } = useAuth0();
	return (
		<Button
			className="AuthButton"
			onClick={async () => {
					await loginWithRedirect({
						appState: {
							returnTo: window.location.pathname,
						},
					});
				}
			}
		>Log In</Button>
	);
}

export default LoginButton;
