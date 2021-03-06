import React from 'react';
import PropTypes from 'prop-types';
import Button from '@codeday/topo/Atom/Button';
import Text from '@codeday/topo/Atom/Text';
import WavingHand from '@codeday/topocons/Emoji/People/WavingHand';
import Box from '@codeday/topo/Atom/Box';

const WelcomeHeader = ({ user }) => {
  return (
    <Box>
      <Text>
        <WavingHand /> Welcome back,&nbsp;
        <Text bold as="span">
          {user.givenName}{user.roles.length > 0 ? " " : ""}
          <Box
            as="span"
            borderRadius={4}
            paddingLeft={1}
            paddingRight={1}
            d={((user.roles.find((role) => role.name === "Employee" || role.name === "Staff" || role.name === "Volunteer"))) ? 'inline-block' : 'none'}
            fontSize="xs"
            fontWeight="bold"
            backgroundColor={((user.roles.find((role) => role.name === "Employee" || role.name === "Staff")) && 'red.600') || 'blue.500'}
            color="white"
            position="relative"
            top="-2px"
          >
            {
              (user.roles.find((role) => role.name === "Employee") && 'Employee')
              || (user.roles.find((role) => role.name === "Staff") && 'Staff')
              || (user.roles.find((role) => role.name === "Volunteer") && 'Volunteer')
            }
          </Box>
        </Text>
          , here are some things you can access
              with your CodeDay account:
        </Text>
      <Box paddingTop={1} paddingBottom={4}>
        {user.sites.map((site) => (
          <Button
            key={site.link}
            marginRight={3}
            marginBottom={3}
            as="a"
            variant="outline"
            href={site.link}
            target="_blank"
          >
            {site.title}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

WelcomeHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default WelcomeHeader