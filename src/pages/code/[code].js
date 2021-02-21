import { AddRole } from './[code].gql';
import React from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import Text from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import Page from '../../components/Page';
import { getSession, signIn } from 'next-auth/client';
import jwt from 'jsonwebtoken';
import { tryAuthenticatedApiQuery } from '../../util/api';

const { serverRuntimeConfig } = getConfig();

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return { props: { logIn: true } };
  }
  let success = false;
  const token = jwt.sign({ id: session.user?.id }, serverRuntimeConfig.auth0.hookSharedSecret)
  let { result, error } = await tryAuthenticatedApiQuery(AddRole, {code: params.code}, token);
  if (result && !error) success = true;

  return {
    props: {
      success
    }
  };
};

const Success = ({ success, logIn }) => {
  if (logIn) return <Page><Button onClick={() => signIn('auth0')}>Sign in to CodeDay</Button></Page>
  return (
    <Page isLoggedIn>
      <Head><title>Add Code</title></Head>
      <Text>{success ? 'Your role was added.' : `That's not a valid role code.`}</Text>
    </Page>
  );
};
export default Success;
