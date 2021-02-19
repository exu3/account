/* eslint-disable no-console */
import getConfig from 'next/config';
import { managementApi } from '../../lib/auth0';
import { getSession } from 'next-auth/client';

const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  const id = (await getSession({ req })).user.id;
  const ticket = await managementApi.createPasswordChangeTicket({
    user_id: id,
    result_url: publicRuntimeConfig.appUrl,
  });
  return res.writeHead(302, { Location: ticket.ticket }).send(ticket.ticket);
};
