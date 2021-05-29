import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Dashboard() {
	const { getAccessTokenSilently } = useAuth0();

	return <div>Dashboard!</div>;
}

export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
