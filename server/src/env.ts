import 'dotenv/config';
import * as env from 'env-var';

export const KANALO_WS_ENDPOINT = env.get('KANALO_WS_ENDPOINT').asString();
export const KANALO_AUDIENCE = env.get('KANALO_AUDIENCE').asString();

export const AUTH0_DOMAIN = env.get('AUTH0_DOMAIN').asString();
export const AUTH0_CLIENT_ID = env.get('AUTH0_CLIENT_ID').asString();
export const AUTH0_CLIENT_SECRET = env.get('AUTH0_CLIENT_SECRET').asString();

export const ISSUER_BASE_URL = env.get('ISSUER_BASE_URL').asString();
export const ALLOWED_AUDIENCES = env.get('ALLOWED_AUDIENCES').asString();
export const CORS_ALLOWED_ORIGINS = env.get('CORS_ALLOWED_ORIGINS').asString()?.split(',');

export const PORT = env.get('PORT').default(8080).asInt();