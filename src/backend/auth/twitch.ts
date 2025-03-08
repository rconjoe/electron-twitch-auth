import { StaticAuthProvider } from "@twurple/auth";
import * as secrets from '../../secrets.json';

const client_id = secrets.TWITCH_CLIENT_ID;
const accessToken = secrets.TWITCH_SECRET;

export const authProvider = new StaticAuthProvider(client_id, accessToken);
