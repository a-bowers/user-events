import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'event',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ],
  environment: {
	  KANALO_API_ENDPOINT: '${env:KANALO_API_ENDPOINT}',
  },
}
