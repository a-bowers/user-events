import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton(returnTo?: string) {
	const { loginWithRedirect } = useAuth0();
	return (
		<Button
			className="AuthButton"
			onClick={async () => {
					await loginWithRedirect({
						appState: {
							returnTo: returnTo || "/dashboard", //window.location.pathname,
						},
					});
					const ws = new WebSocket();
				}
			}
		>Log In</Button>
	);
}

export default LoginButton;
