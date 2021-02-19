import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text from '@codeday/topo/Atom/Text';
import Input from '@codeday/topo/Atom/Input/Text';
import FormControl, { Label, HelpText } from '@codeday/topo/Molecule/FormControl'

const Phone = ({ user, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  return (
    <FormControl>
      <Label fontWeight="bold">What is your phone number?</Label>
      <Input
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          onChange({ phoneNumber: e.target.value });
        }}
      />
      <HelpText>
        We mostly use this if you&apos;re a volunteer, to get in touch during events. If you have two-factor
        authentication turned on, this will <Text as="em">not</Text> change the associated phone number.
      </HelpText>
    </FormControl>
  );
};
Phone.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Phone.provides = 'phoneNumber';
export default Phone;
