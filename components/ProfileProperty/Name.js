import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Input/Text';
import { Grid } from '@codeday/topo/Box';
import FormControl, { Label } from '@codeday/topo/FormControl';

const Name = ({ user, onChange }) => {
  const [familyName, setFamilyName] = useState(user.family_name);
  const [givenName, setGivenName] = useState(user.given_name);

  return (
    <FormControl>
      <Label fontWeight="bold">What name would you like to go by?</Label>
      <Grid templateColumns="1fr 1fr" gap={2}>
        <Input
          value={givenName}
          placeholder="First Name"
          onChange={(e) => {
            setGivenName(e.target.value);
            onChange({ given_name: e.target.value, family_name: familyName });
          }}
        />
        <Input
          value={familyName}
          placeholder="Last Name"
          onChange={(e) => {
            setFamilyName(e.target.value);
            onChange({ given_name: givenName, family_name: e.target.value });
          }}
        />
      </Grid>
    </FormControl>
  );
};
Name.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Name.provides = ['family_name', 'given_name'];
export default Name;
