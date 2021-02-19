import React from 'react';
import PropTypes from 'prop-types';
import Door from '@codeday/topocons/Icon/Door';
import Theme from '@codeday/topo/Theme';
import Button from '@codeday/topo/Atom/Button';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Divider from '@codeday/topo/Atom/Divider';
import { CodeDay } from '@codeday/topo/Atom/Logo';
import Text from '@codeday/topo/Atom/Text';
import { SiteLogo } from '@codeday/topo/Organism/Header';
import { signOut } from 'next-auth/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Page = ({ children, isLoggedIn }) => {
  return (
    <Theme>
      <Box margin="1rem auto" maxWidth="600px" width="100%" rounded="sm" borderWidth="1px" marginTop="4" padding={0}>
        <Box padding={3} margin={0} bg="gray.50">
          <Grid templateColumns="10fr 2fr" gap={6}>
            <SiteLogo>
              <a href="https://www.codeday.org/">
                <CodeDay withText />
              </a>
              <a href="/">
                <Text
                  as="span"
                  d="inline"
                  letterSpacing="-2px"
                  fontFamily="heading"
                  position="relative"
                  top={1}
                  ml={1}
                  textDecoration="underline"
                  bold
                >
                  Account
                </Text>
              </a>
            </SiteLogo>
            {isLoggedIn && <Button onClick={() => signOut({callbackUrl: `${publicRuntimeConfig.appUrl}/logout`})}><Door /></Button>}
          </Grid>
        </Box>
        <Divider marginTop={0} />
        <Box padding={3} paddingBottom={5}>{children}</Box>
      </Box>
    </Theme>
  );
}
Page.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
Page.defaultProps = {
  isLoggedIn: false,
};
export default Page;
