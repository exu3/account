import React, { useState } from 'react';
import fetch from 'node-fetch';
import { sign } from 'jsonwebtoken';
import getConfig from 'next/config';
import Head from 'next/head';
import Text, { Heading } from '@codeday/topo/Text';
import Page from '../../components/Page';
import loginApi from '../../lib/login';
import refreshUser from '../../utils/refresh-user';

const { serverRuntimeConfig } = getConfig();

const query = `mutation AddRole($id: ID!, $code: String!) {
  account {
    addRoleByCode(where: { id: $id }, code: $code)
  }
}`

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await loginApi.getSession(req);
  const token = sign({ scopes: 'write:users' }, serverRuntimeConfig.graphSecret, { expiresIn: '30s' });

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: `/api/login?redirect=/code/${params.code}`,
    });
    res.end();
    return { props: {} };
  }

  const user = await refreshUser(session.user.sub);
  let success = false;

  try {
    const { data, errors } = await (await fetch('https://graph.codeday.org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { id: user.user_id, code: params.code },
      })
    })).json();
    success = Boolean(data && !errors);
  } catch (ex) { console.error(ex); }

  return {
    props: {
      success,
    },
  };
};

const Success = ({ success }) => {
  const [error, setError] = useState();
  const [request, setRequest] = useState({});
  return (
    <Page isLoggedIn>
      <Head><title>Add Code</title></Head>
      <Text>{success ? 'Your role was added.' : `That's not a valid role code.`}</Text>
    </Page>
  );
};
export default Success;
