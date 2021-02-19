module.exports = {
  serverRuntimeConfig: {
    auth0: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      managementDomain: process.env.AUTH0_MANAGEMENT_DOMAIN,
      hookSharedSecret: process.env.AUTH0_HOOK_SHARED_SECRET,
    },
  },
  publicRuntimeConfig: {
    appUrl: process.env.APP_URL,
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
    },
  },
};
