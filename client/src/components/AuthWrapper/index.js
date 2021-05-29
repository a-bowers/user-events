// import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthWrapper = ({ children }) => {
	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

	// const history = useHistory();

	// const onRedirectCallback = (appState) => {
	// 	history.push(appState?.returnTo);
	// };

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={typeof window !== "undefined" ? window.location.origin : ""}
			// onRedirectCallback={onRedirectCallback}
			scope="openid profile email"// updated_at"
		>
			{children}
		</Auth0Provider>
	);
};

export default AuthWrapper;
