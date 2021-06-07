// import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useCallback } from "react";

function WSWrapper({ children }) {
	const [gws, updateWs] = useState();
	const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const connectWS = useCallback(async () => {
		const accessToken = await getAccessTokenSilently();
		const ws = new WebSocket(
			`${process.env.REACT_APP_KANALO_URL}?token=` + accessToken
		);

		ws.onmessage = ({ data }) => {
			if (data === "logout") {
				// Force a reload and the component will realize it's logged out (since Auth0 knows)
				window.location.reload();
				return;
			}
		};

		ws.onclose = () => {
			if (isAuthenticated) {
				//Unexpected connection loss, reconnect
				return connectWS();
			}
		};

		updateWs(ws);
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const disconnectWS = useCallback(() => {
		if (gws) {
			gws.close();
			updateWs(null);
		}
	});

	// function send(data) {
	// 	if (!gws) {
	// 		throw new Error("Socket is not connected");
	// 	}
	// 	gws.send(JSON.stringify(data));
	// }

	useEffect(() => {
		(async () => {
			if (isLoading) return;

			if (!isAuthenticated) {
				return disconnectWS(gws);
			}

			if (!gws) {
				return connectWS();
			}
		})();
	}, [gws, isLoading, isAuthenticated, user, connectWS, disconnectWS]);

	return children;
};

export default WSWrapper;
