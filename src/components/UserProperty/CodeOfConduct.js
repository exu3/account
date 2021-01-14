import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@codeday/topo/Atom/Input/Checkbox';
import FormControl, { Label, HelpText } from '@codeday/topo/Molecule/FormControl';
import Text, { Link } from '@codeday/topo/Atom/Text';
import List, { Item } from '@codeday/topo/Atom/List';

const CodeOfConduct = ({ user, onChange }) => {
  const [checked, setChecked] = useState(user.acceptTos ? true : false);

  return (
    <FormControl>
      <Label fontWeight="bold">Help us help you help us all:</Label>
      <Text>To make our community as welcoming as possible, we need your help:</Text>
      <List styleType="disc">
        <Item>Please be friendly and welcoming.</Item>
        <Item>Keep things safe and legal.</Item>
        <Item>Community members may not harass others.</Item>
      </List>
      <Text>
        The full Code of Conduct is available
        at <Link href="https://codeday.to/conduct" target="_blank">codeday.to/conduct</Link>.
      </Text>
      <Checkbox
        marginTop={3}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange({ acceptTos: e.target.checked });
        }}
        isDisabled={user.acceptTos}
        isChecked={checked}
      >
        I agree to the Code of Conduct
      </Checkbox>
      <HelpText>
        If you ever have a problem with another member of the community, you can talk to any member of our staff, or
        email us. More info on how to reach us is available at codeday.to/conduct.
      </HelpText>
    </FormControl>
  );
};
CodeOfConduct.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
CodeOfConduct.provides = 'acceptTos';
export default CodeOfConduct;
