import express from 'express';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import { auth } from 'express-oauth2-bearer';
import { AuthenticationClient } from 'auth0';
import ws from 'ws';

import {
	AUTH0_DOMAIN,
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	PORT,
	CORS_ALLOWED_ORIGINS,
	ISSUER_BASE_URL,
	ALLOWED_AUDIENCES,
	KANALO_AUDIENCE,
	KANALO_WS_ENDPOINT,
} from './env';

dotenv.config();

const auth0 = new AuthenticationClient({
	domain: AUTH0_DOMAIN,
	clientId: AUTH0_CLIENT_ID,
	clientSecret: AUTH0_CLIENT_SECRET,
});

const app = express();

let token: string = null;
let expiry: number = 0;
const blacklist: Set<string> = new Set<string>();

// CORS
app.use((req, res, next) => {
	if (req.headers.origin && CORS_ALLOWED_ORIGINS?.includes(req.headers.origin)) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
	}
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	next();
});

// Token Auth
app.use(auth({
	issuerBaseURL: ISSUER_BASE_URL,
	allowedAudiences: ALLOWED_AUDIENCES,
}));

// Code Route
app.get('/', (req, res) => {
	if (blacklist.has((req as any).auth.claims.sub)) {
		return res.status(403).send('User Blacklisted');
	}
    res.send(uuid().split('-')[0]);
});

// Kanalo WebSocket connection
async function connectWS() {
	try {
		if (!token || Date.now() > expiry) {
			const auth0Res = await auth0.clientCredentialsGrant({
				audience: KANALO_AUDIENCE,
			});
			token = auth0Res.access_token;
			expiry = auth0Res.expires_in*1000 + Date.now();
		}
		
		const kanalo = new ws(KANALO_WS_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		
		kanalo.on('message', (userId: string) => {
			console.log(`Adding ${userId} to blacklist`);
			if (!blacklist.has(userId)) {
				blacklist.add(userId);
				setTimeout(() => {
					console.log(`Removing ${userId} from blacklist`);
					blacklist.delete(userId);
				}, 120*1000);
			}
		});

		kanalo.on('close', async () => {
			await connectWS()
		});
	} catch (err) {
		console.log(err);
	}
}

app.listen(PORT, async () => {
	console.log(`Server started on port ${PORT}`);
	await connectWS();
});