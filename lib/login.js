import getConfig from 'next/config';
import { initAuth0 } from '@auth0/nextjs-auth0';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default initAuth0({
  domain: publicRuntimeConfig.auth0.domain,
  clientId: serverRuntimeConfig.auth0.clientId,
  clientSecret: serverRuntimeConfig.auth0.clientSecret,
  scope: 'openid profile',
  redirectUri: `${publicRuntimeConfig.appUrl}/api/callback`,
  postLogoutRedirectUri: `${publicRuntimeConfig.appUrl}/logout`,
  session: {
    cookieSecret: serverRuntimeConfig.appSecret,
    cookieLifetime: 60 * 60 * 8,
    cookieSameSite: 'lax',
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});
