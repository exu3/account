import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@codeday/topo/Box';
import Radio, { Group } from '@codeday/topo/Input/Radio';
import FormControl, { Label } from '@codeday/topo/FormControl';

const Name = ({ user, onChange }) => {
  const [displayNameFormat, setDisplayNameFormat] = useState(user.user_metadata.display_name_format);

  return (
    <FormControl>
      <Label fontWeight="bold">How would you like your name displayed in public?</Label>
      <Grid templateColumns="1fr 1fr" gap={2}>
        <Group
          value={displayNameFormat}
          onChange={(e) => {
            setDisplayNameFormat(e.target.value);
            onChange({ user_metadata: { display_name_format: e.target.value } });
          }}
        >
          <Radio value="initials">
            {user.given_name ? user.given_name[0].toUpperCase() : 'First Initial'}{' '}
            {user.family_name ? user.family_name[0].toUpperCase() : 'Last Initial'}
          </Radio>
          <Radio value="given">{user.given_name || 'First Name'}</Radio>
          <Radio value="short">{user.given_name || 'First Name'} {user.family_name ? user.family_name[0].toUpperCase() : 'Last Initial'}</Radio>
          <Radio value="full">{user.given_name || 'First Name'} {user.family_name || 'Last Name'}</Radio>
        </Group>
      </Grid>
    </FormControl>
  );
};
Name.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Name.provides = ['user_metadata.display_name_format'];
export default Name;
