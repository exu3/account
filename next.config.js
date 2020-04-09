module.exports = {
  serverRuntimeConfig: {
    auth0: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      hookSharedSecret: process.env.AUTH0_HOOK_SHARED_SECRET,
      managementDomain: process.env.AUTH0_MANAGEMENT_DOMAIN,
    },
    contentful: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      token: process.env.CONTENTFUL_TOKEN,
    },
    appSecret: process.env.APP_SECRET,
    volunteerCode: process.env.VOLUNTEER_CODE,
  },
  publicRuntimeConfig: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
    },
    appUrl: process.env.APP_URL,
  },
};
