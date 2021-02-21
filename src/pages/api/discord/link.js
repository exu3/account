/* eslint-disable no-console */
import { discordApi } from '../../../lib/discord'
import crypto from 'crypto'
import { getSession } from 'next-auth/client';
import { CheckDiscordLinked } from './discord.gql'
import { tryAuthenticatedServerApiQuery } from '../../../util/api';

export default async (req, res) => {
  const session = await getSession({ req })
  const { result } = await tryAuthenticatedServerApiQuery(CheckDiscordLinked, {userId: session.user.id})
  if (result?.account?.getUser?.discordId) {
    res.redirect('/discord/error?code=codedayalreadylinked');
    return
  }
  if (!session || !session.user) { res.redirect('/'); return; }
  const discordLink = discordApi.generateAuthUrl({scope: ["identify", "guilds"],state: crypto.randomBytes(16).toString("hex")})
  res.redirect(discordLink);
};