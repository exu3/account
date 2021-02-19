import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const options = {
  providers: [
    Providers.Auth0({
      clientId: serverRuntimeConfig.auth0.clientId,
      clientSecret: serverRuntimeConfig.auth0.clientSecret,
      domain: publicRuntimeConfig.auth0.domain,
      authorizationUrl: `https://${publicRuntimeConfig.auth0.domain}/authorize?response_type=code&prompt=login`
    })
  ],
  session: {
    jwt: true
  },
  callbacks: {
    jwt: async (token, _, account) => {
      if (account?.id) token.id = account.id
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user.id = user.id
      return Promise.resolve(session)
    },
  }
}

export default (req, res) => NextAuth(req, res, options)