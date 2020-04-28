/* eslint-disable no-console */
import loginApi from '../../lib/login';
import { managementApi } from '../../lib/auth0';

export default async (req, res) => {
  const id = (await loginApi.getSession(req)).user.sub;
  const ticket = await new Promise((resolve, reject) => {
    managementApi.guardian.tickets.create({ user_id: id }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
  console.log(ticket);
  res.writeHead(302, { Location: ticket.ticket_url }).send(ticket.ticket_url);
};
