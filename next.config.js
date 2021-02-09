module.exports = {
  serverRuntimeConfig: {
    auth0: {
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      hookSharedSecret: process.env.AUTH0_HOOK_SHARED_SECRET,
      managementDomain: process.env.AUTH0_MANAGEMENT_DOMAIN,
      volunteerRole: process.env.AUTH0_VOLUNTEER_ROLE,
      mentorRole: process.env.AUTH0_MENTOR_ROLE,
    },
    uploader: {
      url: process.env.UPLOADER_URL,
      secret: process.env.UPLOADER_SECRET,
      allowedUrlPrefix: process.env.UPLOADER_ALLOWED_URL_PREFIX,
    },
    contentful: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      token: process.env.CONTENTFUL_TOKEN,
    },
    appSecret: process.env.APP_SECRET,
    graphSecret: process.env.GRAPH_SECRET,
    volunteerCode: process.env.VOLUNTEER_CODE,
    mentorCode: process.env.MENTOR_CODE,
  },
  publicRuntimeConfig: {
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
    },
    appUrl: process.env.APP_URL,
  },
};
