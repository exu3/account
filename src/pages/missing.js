import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import Head from 'next/head';
import Box from '@codeday/topo/Atom/Box';
import Text from '@codeday/topo/Atom/Text';
import PartyPopper from '@codeday/topocons/Emoji/Objects/PartyPopper';
import Page from '../components/Page';
import ProfileBlocks from '../components/UserProperties';
import SubmitUpdates from '../components/SubmitUpdates';
import { userFromJwt } from '../util/profile';
import { tryAuthenticatedApiQuery } from '../util/api';
import { MissingUserQuery } from './missing.gql'
import merge from 'deepmerge';
import jwt from 'jsonwebtoken';
import Link from '@codeday/topo/Atom/Text/Link';


const Missing = ({ user, state, domain, token }) => {
  if (!user || !user.roles) return <Page>We couldn't fetch your data! Please refresh the page and try again. If the error persists contact us at <Link href="https://www.codeday.org/contact">codeday.org/contact</Link>.</Page>
  const missingInfo = [];
  if (!user.username) missingInfo.push('username');
  if (!user.givenName) missingInfo.push('givenName');
  if (!user.familyName) missingInfo.push('familyName');
  if (!user.displayNameFormat) missingInfo.push('displayNameFormat');
  if (!user.pronoun) missingInfo.push('pronoun');
  if (!user.acceptTos) missingInfo.push('acceptTos');
  if (user.roles) {
    if (user.roles.find((role) => role.name === "Volunteer") && !user.phoneNumber) missingInfo.push('phoneNumber');
    if (!user.roles.find((role) => role.name === "Volunteer")) missingInfo.push('volunteer');
  }

  const [changes, setChanges] = useState({});

  return (
    <Page>
      <Head>
        <title>Missing Info ~ CodeDay Account</title>
      </Head>
      <Text marginTop={0}>
        <PartyPopper /> Welcome to the CodeDay community, <Text as="span" bold>{user.name}!</Text> We just need a
            few more pieces of information from you:
          </Text>
      <ProfileBlocks
        user={merge(user, changes)}
        onChange={setChanges}
        fields={missingInfo}
      />
      <Box textAlign="right">
        <SubmitUpdates
          required={missingInfo.filter((e) => e !== 'volunteer')}
          token={token}
          username={user.username}
          user={user}
          changes={changes}
          onSubmit={() => {
            // eslint-disable-next-line no-undef
            window.location.href = `https://${domain}/continue?state=${state}`;
          }}
        />
      </Box>
    </Page>
  );
};
Missing.propTypes = {
  user: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
export default Missing;


export const getServerSideProps = async ({ req, query }) => {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const jwtUser = userFromJwt(query.token);
  
  const token = jwt.sign({ id: jwtUser?.sub }, serverRuntimeConfig.auth0.hookSharedSecret)
  let { result, error } = await tryAuthenticatedApiQuery(MissingUserQuery, { id: jwtUser.sub }, token);
  if (error) return { props: {} }
  return {
    props: {
      user: result.account.getUser,
      state: query.state,
      domain: publicRuntimeConfig?.auth0?.domain,
      token: token,
      cookies: req.headers.cookie ?? "",
    },
  };
};