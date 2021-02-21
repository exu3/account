import getConfig from 'next/config';
import OAuth from 'discord-oauth2'

const { serverRuntimeConfig } = getConfig();

export const discordApi = new OAuth({
  version: 'v8',
  clientId: serverRuntimeConfig.discord.clientId,
  clientSecret: serverRuntimeConfig.discord.clientSecret,
  redirectUri: serverRuntimeConfig.discord.redirectUri,
});