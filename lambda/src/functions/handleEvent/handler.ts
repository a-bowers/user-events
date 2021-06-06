import 'source-map-support/register';

import axios from 'axios';
import { AuthenticationClient } from 'auth0';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const auth0 = new AuthenticationClient({
	domain: 'kanalo.us.auth0.com',
	clientId: process.env.KANALO_CLIENT_ID,
	clientSecret: process.env.KANALO_CLIENT_SECRET,
});

const handleEvent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const commandList = [];

	for (const item of event.body) {
		console.log(item.data.type);
		if (item.data.type === 'slo') {
			console.log(JSON.stringify(item.data));
			commandList.push(
				{
					method: 'messageTag',
					params: {
						tags: [item.data.user_id],
						message: 'logout',
					},
				},
				{
					method: 'messageTag',
					params: {
						tags: ['server'],
						message: item.data.user_id,
					},
				},
			);
		}
	}

	if (commandList.length > 0) {
		try {
			const { access_token } = await auth0.clientCredentialsGrant({
				audience: 'https://kanalo.dev/api/',
				scope: 'sockets tags',
			});
			const kanaloRes = await axios.put(process.env.KANALO_API_ENDPOINT, commandList, {
				headers: {
					authorization: `Bearer ${access_token}`,
				}
			});
			console.log(`${kanaloRes.status} ${kanaloRes.statusText}`);
		} catch (err) {
			console.log(err);
		}
	}
  return formatJSONResponse({});
}

export const main = middyfy(handleEvent);
