import React, { useState } from 'react';
import { tryAuthenticatedApiQuery } from '../util/api';
import Page from '../components/Page';
import Head from 'next/head';
import { useRouter } from 'next/router';
import WelcomeHeader from '../components/WelcomeHeader';
import { Heading } from '@codeday/topo/Atom/Text';
import { IndexSitesFromRoleQuery, IndexUserQuery } from './index.gql'
import Divider from '@codeday/topo/Atom/Divider';
import merge from 'deepmerge';
import UserProperties from '../components/UserProperties';
import Button from '@codeday/topo/Atom/Button';
import SubmitUpdates from '../components/SubmitUpdates';
import Box from '@codeday/topo/Atom/Box';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import Link from '@codeday/topo/Atom/Text/Link';
import { getSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';
import { codedayTheme as theme, useColorMode } from "@codeday/topo/Theme"

const { serverRuntimeConfig } = getConfig();

export default function Home({ user, token, logIn }) {

  if (logIn) return <Page><Button onClick={() => signIn('auth0')}>Sign in to CodeDay</Button></Page>
  const { colorMode, toggleColorMode } = useColorMode()
  const [changes, setChanges] = useState({});
  const router = useRouter();
  const onSubmit = () => {
    router.replace(router.asPath);
    setChanges({})
  }
  // @ts-ignore
  if (!user || !user.roles) return <Page>We couldn't fetch your data! Please refresh the page and try again. If the error persists contact us at <Link href="https://www.codeday.org/contact">codeday.org/contact</Link>.</Page>

  return (
    <Page slug="/" isLoggedIn={true}>
      <Head>
        <title>CodeDay Account</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
      </Head>
      <WelcomeHeader user={user} />
      <Divider />
      <Heading as="h2" size="lg" paddingTop={4}>Update Your Account</Heading>
      <UserProperties token={token} user={merge(user, changes)} fields={["username", "picture", 'familyName', 'givenName', "displayNameFormat", "pronoun", (user.badges ? "badges" : null), "phoneNumber", "bio", "volunteer", (user.roles.find((role) => role.name === "Volunteer") ? "title" : null), "discord"]} onChange={setChanges} />
      <Box textAlign="right" marginRight={3}>
        <SubmitUpdates token={token} user={user} changes={changes} required={['username', 'givenName', 'familyName', 'pronoun']} onSubmit={onSubmit} />
        <Box marginTop={3}>
          <Button
            size="xs"
            onClick={toggleColorMode}
            marginRight={1}
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button
            as="a"
            href="/api/password"
            size="xs"
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Page>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return { props: { logIn: true } };
  }
  const token = jwt.sign({ id: session.user?.id }, serverRuntimeConfig.auth0.hookSharedSecret)
  let { result, error } = await tryAuthenticatedApiQuery(IndexUserQuery, {}, token);
  console.log(error)
  if (error) return { props: {} }

  return {
    props: {
      user: result?.account?.getUser || null,
      token
    }
  };
}
