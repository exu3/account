import getConfig from 'next/config';
import { ManagementClient } from 'auth0';

const { serverRuntimeConfig } = getConfig();

export const managementApi = new ManagementClient({
  domain: serverRuntimeConfig.auth0.managementDomain,
  clientId: serverRuntimeConfig.auth0.clientId,
  clientSecret: serverRuntimeConfig.auth0.clientSecret,
  scope: 'read:users update:users',
});
