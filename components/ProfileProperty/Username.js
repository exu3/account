import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Input/Text';
import FormControl, { Label, HelpText } from '@codeday/topo/FormControl';

const Username = ({ user, onChange }) => {
  const [username, setUsername] = useState(user.username);
  return (
    <FormControl>
      <Label fontWeight="bold">Username</Label>
      <Input
        value={username}
        isDisabled={user.username}
        onChange={(e) => {
          const sanitizedUsername = e.target.value.replace(/[^a-zA-Z0-9\-_]/g, '');
          setUsername(sanitizedUsername);
          onChange({ username: sanitizedUsername });
        }}
      />
      <HelpText>
        {user.username
          ? `Sorry, you can't change your username.`
          : `You can't change this later, so choose wisely!`}
      </HelpText>
    </FormControl>
  );
};
Username.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Username.provides = 'username';
export default Username;
