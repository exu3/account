import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Input/Text';
import FormControl, { Label, HelpText } from '@codeday/topo/FormControl';

const Title = ({ user, onChange }) => {
  const [title, setTitle] = useState(user.user_metadata.title || 'Volunteer');

  return (
    <FormControl>
      <Label fontWeight="bold">What&apos;s your role here?</Label>
      <Input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onChange({ user_metadata: { title: e.target.value } });
        }}
      />
      <HelpText>
        This is usually something like &ldquo;Mentor&rdquo; or just &ldquo;Volunteer&rdquo;. If you have a special
        title you&apos;ll usually be told this by your manager.
      </HelpText>
    </FormControl>
  );
};
Title.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Title.provides = 'user_metadata.title';
export default Title;
