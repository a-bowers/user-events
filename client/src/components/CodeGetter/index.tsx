import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';


function CodeGetter() {
	const [code, updateCode] = useState<string>();
	const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

	async function getCode() {
		try {
			const token = await getAccessTokenSilently();
			const res = await axios.get(process.env.REACT_APP_SERVER_URL || '', {
				headers: {
					Authorization: `Bearer ${token}`
				},
			});
		updateCode(res.data);
		} catch (err) {
			if (err.response.status === 403) {
				updateCode(err.response.data);
			}
		}
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated) {
		if(!code) {
			getCode();
		}

		return (<>
			<div>Your code:</div>
			<div>{code}</div>
			<Button
				className="AuthButton"
				onClick={getCode}
			>New Code</Button>
		</>);
	}

	return <></>;
}

export default CodeGetter;
