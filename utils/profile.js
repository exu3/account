import axios from 'axios';
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const updateUserProfile = async (userInformation, token) => (
  axios.post(`/api/update${token ? `?token=${encodeURIComponent(token)}` : ''}`, userInformation)
);

export const userFromJwt = (token) => jwt.verify(token, serverRuntimeConfig.auth0.hookSharedSecret).user;
