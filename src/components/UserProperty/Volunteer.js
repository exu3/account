import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Atom/Input/Text';
import Button from '@codeday/topo/Atom/Button';
import Collapse from '@codeday/topo/Molecule/Collapse';
import FormControl, { Label, HelpText } from '@codeday/topo/Atom/Form'

const Volunteer = ({ user, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [volunteerCode, setVolunteerCode] = useState('');

  if (user.roles.find((role) => role.name === "Mentor" || role.name === "Volunteer")) return <></>;

  return (
    <FormControl>
      <Label fontWeight="bold">
        {
          !isVisible
            ? `Are you a volunteer?`
            : `What's your volunteer access code?`
        }
      </Label>
      <Collapse in={!isVisible}>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setIsVisible(true)}
        >
          Yes, I&apos;m a volunteer!
        </Button>
      </Collapse>
      <Collapse in={isVisible}>
        <Input
          value={volunteerCode}
          onChange={(e) => {
            setVolunteerCode(e.target.value);
            onChange({ addRole: e.target.value });
          }}
        />
        <HelpText>You can get this from your staff contact.</HelpText>
      </Collapse>
    </FormControl>
  );
};
Volunteer.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Volunteer.provides = ['volunteer', 'addRole'];
export default Volunteer;
