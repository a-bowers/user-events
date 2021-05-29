import 'source-map-support/register';

import axios from 'axios';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const handleEvent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const commandList = [];

	for (const item of event.body) {
		if (item.data.type === 'slo') {
			console.log(JSON.stringify(item.data));
			commandList.push([
				{
					command: 'disconnectTag',
					params: {
						tags: [item.data.user_id],
						reason: 'User Event',
					},
				},
				{
					command: 'messageTag',
					params: {
						tags: ['server'],
						message: item.data.user_id,
					},
				},
			]);
		} else {
			console.log(item.data.type);
		}
	}

	if (commandList.length > 0) {
		const kanaloRes = await axios.put(process.env.KANALO_API_ENDPOINT, commandList);
	}
  return formatJSONResponse({});
}

export const main = middyfy(handleEvent);
