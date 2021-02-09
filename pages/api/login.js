/* eslint-disable no-console */
import loginApi from '../../lib/login';

export default async (req, res) => {
  try {
    const redirectTo = req.query?.redirect && req.query.redirect[0] === '/' && req.query.redirect[1] !== '/' ? req.query.redirect : null;
    await loginApi.handleLogin(req, res, { redirectTo });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
