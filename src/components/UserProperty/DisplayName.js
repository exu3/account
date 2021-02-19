import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@codeday/topo/Atom/Box';
import Radio, { Group } from '@codeday/topo/Atom/Input/Radio';
import FormControl, { Label } from '@codeday/topo/Molecule/FormControl';

const DisplayName = ({ user, onChange }) => {
  const [displayNameFormat, setDisplayNameFormat] = useState(user.displayNameFormat);

  return (
    <FormControl>
      <Label fontWeight="bold">How would you like your name displayed in public?</Label>
      <Grid templateColumns="1fr 1fr" gap={2}>
        <Group
          value={displayNameFormat}
          onChange={(e) => {
            setDisplayNameFormat(e.target.value);
            onChange({ displayNameFormat: e.target.value });
          }}
        >
          <Radio value="initials">
            {user.givenName ? user.givenName[0].toUpperCase() : 'First Initial'}{' '}
            {user.familyName ? user.familyName[0].toUpperCase() : 'Last Initial'}
          </Radio>
          <Radio value="given">{user.givenName || 'First Name'}</Radio>
          <Radio value="short">{user.givenName || 'First Name'} {user.familyName ? user.familyName[0].toUpperCase() : 'Last Initial'}</Radio>
          <Radio value="full">{user.givenName || 'First Name'} {user.familyName || 'Last Name'}</Radio>
        </Group>
      </Grid>
    </FormControl>
  );
};
DisplayName.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
DisplayName.provides = ['displayNameFormat'];
export default DisplayName;
