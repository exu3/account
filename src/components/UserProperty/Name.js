import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Atom/Input/Text';
import { Grid } from '@codeday/topo/Atom/Box';
import FormControl, { Label } from '@codeday/topo/Atom/Form';
import { codedayTheme } from '@codeday/topo/Theme';

const Name = ({ user, onChange }) => {
  const [familyName, setFamilyName] = useState(user.familyName);
  const [givenName, setGivenName] = useState(user.givenName);
  
  return (
    <FormControl>
      <Label fontWeight="bold">What name would you like to go by?</Label>
      <Grid templateColumns="1fr 1fr" gap={2}>
        <Input
          value={givenName}
          placeholder="First Name"
          id="firstname"
          onChange={(e) => {
            setGivenName(e.target.value);
            onChange({ givenName: e.target.value, familyName: familyName });
          }}
        />
        <Input
          value={familyName}
          placeholder="Last Name"
          id="lastname"
          onChange={(e) => {
            setFamilyName(e.target.value);
            onChange({ givenName: givenName, familyName: e.target.value });
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
Name.provides = ['familyName', 'givenName'];
export default Name;
