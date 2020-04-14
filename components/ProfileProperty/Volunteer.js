import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Input/Text';
import Button from '@codeday/topo/Button';
import Collapse from '@codeday/topo/Collapse';
import FormControl, { Label, HelpText } from '@codeday/topo/FormControl';

const Volunteer = ({ user, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [volunteerCode, setVolunteerCode] = useState('');

  if (user.user_metadata.volunteer) return <></>;

  return (
    <FormControl>
      <Label fontWeight="bold">
        {
          !isVisible
            ? `Are you a volunteer?`
            : `What's your volunteer access code?`
        }
      </Label>
      <Collapse isOpen={!isVisible}>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setIsVisible(true)}
        >
          Yes, I&apos;m a volunteer!
        </Button>
      </Collapse>
      <Collapse isOpen={isVisible}>
        <Input
          value={volunteerCode}
          onChange={(e) => {
            setVolunteerCode(e.target.value);
            onChange({ _meta: { volunteer_code: e.target.value } });
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
Volunteer.provides = ['user_metadata.volunteer', '_meta.volunteer_code'];
export default Volunteer;
