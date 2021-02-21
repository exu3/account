/* eslint-disable no-console */
import { getSession } from 'next-auth/client';
import jwt from 'jsonwebtoken';
import { LinkDiscordMutation, CheckCodeDayLinked } from './discord.gql'
import { tryAuthenticatedServerApiQuery } from '../../../util/api';
import { discordApi } from '../../../lib/discord'
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  const code = req.query.code;
  const { access_token } = await discordApi.tokenRequest({	
    code: code,
	  scope: "identify guilds",
	  grantType: "authorization_code",
	})
  const {id: discordId} = await discordApi.getUser(access_token)
  const { result, error } = await tryAuthenticatedServerApiQuery(CheckCodeDayLinked, { discordId })
  if (result.account.getUser) {
    res.redirect('/discord/error?code=discordalreadylinked');
    return
  }
  const userId = await (await getSession({ req })).user.id
  const token = jwt.sign({scopes: "write:users"}, serverRuntimeConfig.gqlAccountSecret, {expiresIn: "1m"})
  await tryAuthenticatedServerApiQuery(LinkDiscordMutation, { discordId, userId }, token)
  res.redirect(`/discord/success`);
};