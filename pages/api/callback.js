/* eslint-disable no-console */
import loginApi from '../../lib/login';

export default async (req, res) => {
  try {
    await loginApi.handleCallback(req, res, { redirectTo: '/' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
