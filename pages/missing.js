import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import Head from 'next/head';
import Box from '@codeday/topo/Box';
import Text from '@codeday/topo/Text';
import Alert, { Title as AlertTitle, Icon as AlertIcon } from '@codeday/topo/Alert';
import PartyPopper from '@codeday/topocons/Emoji/Objects/PartyPopper';
import Page from '../components/Page';
import ProfileBlocks from '../components/ProfileBlocks';
import SubmitUpdates from '../components/SubmitUpdates';
import { userFromJwt } from '../utils/profile';
import refreshUser from '../utils/refresh-user';

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps = async ({ query }) => {
  const jwtUser = userFromJwt(query.token);
  const user = await refreshUser(jwtUser.user_id);

  return {
    props: {
      user,
      state: query.state,
      token: query.token,
    },
  };
};

const Missing = ({ user, state, token }) => {
  const missingInfo = [];
  if (!user.username) missingInfo.push('username');
  if (!user.given_name) missingInfo.push('given_name');
  if (!user.family_name) missingInfo.push('family_name');
  if (!user.user_metadata.display_name_format) missingInfo.push('user_metadata.display_name_format');
  if (user.roles.volunteer && !user.user_metadata.phone_number) missingInfo.push('user_metadata.phone_number');
  if (!user.user_metadata.pronoun) missingInfo.push('user_metadata.pronoun');
  if (!user.user_metadata.accept_tos) missingInfo.push('user_metadata.accept_tos');
  if (!user.roles.volunteer) missingInfo.push('roles.volunteer');

  const [request, setRequest] = useState();
  const [error, setError] = useState();

  return (
    <Page>
      <Head>
        <title>Missing Info ~ CodeDay Account</title>
      </Head>
      {!error
        ? (
          <Text marginTop={0}>
            <PartyPopper /> Welcome to the CodeDay community, <Text as="span" bold>{user.name}!</Text> We just need a
            few more pieces of information from you:
          </Text>
        ) : (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      <ProfileBlocks
        user={user}
        onChange={setRequest}
        fields={missingInfo}
      />
      <Box>
        <SubmitUpdates
          required={missingInfo.filter((e) => e !== 'roles.volunteer')}
          user={user}
          token={token}
          request={request}
          onError={setError}
          onSubmit={() => {
            // eslint-disable-next-line no-undef
            window.location.href = `https://${publicRuntimeConfig.auth0.domain}/continue?state=${state}`;
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
