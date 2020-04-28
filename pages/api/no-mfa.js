/* eslint-disable no-console */
import loginApi from '../../lib/login';
import { managementApi } from '../../lib/auth0';

export default async (req, res) => {
  const id = (await loginApi.getSession(req)).user.sub;
  const enrollments = await managementApi.getGuardianEnrollments({ id });
  enrollments.forEach((factor) => managementApi.guardian.enrollments.delete({ id: factor.id }));
  res.writeHead(302, { Location: '/' }).send('ok');
};
