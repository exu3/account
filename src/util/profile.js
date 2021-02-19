// import axios from 'axios';
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
import axios from 'axios';
const { serverRuntimeConfig } = getConfig();

export const submitUserChanges = async (changes, token) => (
  axios.post(`/api/update${token ? `?token=${encodeURIComponent(token)}` : ''}`, changes)
);

export const userFromJwt = (token) => jwt.verify(token, serverRuntimeConfig.auth0.hookSharedSecret);
