import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import Box from '@codeday/topo/Box';
import Text from '@codeday/topo/Text';
import Alert, { Title as AlertTitle, Icon as AlertIcon } from '@codeday/topo/Alert';
import BrokenHeart from '@codeday/topocons/Emoji/Symbols/BrokenHeart';
import Page from '../components/Page';
import ProfileBlocks from '../components/ProfileBlocks';
import SubmitUpdates from '../components/SubmitUpdates';
import { userFromJwt } from '../utils/profile';

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps = async ({ query }) => {
  const jwtUser = userFromJwt(query.token);
  // eslint-disable-next-line global-require
  const { managementApi } = require('../lib/auth0');
  const id = jwtUser.user_id;
  const user = await managementApi.getUser({ id }); // Get the latest profile (OAuth only returns the profile at login)

  return {
    props: {
      user,
      state: query.state,
      token: query.token,
    },
  };
};

const Missing = ({ user, state, token }) => {
  const [request, setRequest] = useState({});
  const [error, setError] = useState();

  return (
    <Page>
      {!error
        ? (
          <Text marginTop={0}>
            <BrokenHeart /> Sorry, <Text as="span" bold>{user.given_name},</Text> but that site is only for volunteers.
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
        fields={['_meta.volunteer_code']}
      />
      <Box>
        <SubmitUpdates
          required={['_meta.volunteer_code']}
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
