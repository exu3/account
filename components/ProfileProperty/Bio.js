import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textarea from '@codeday/topo/Input/Textarea';
import FormControl, { Label, HelpText } from '@codeday/topo/FormControl';

const Bio = ({ user, onChange }) => {
  const [bio, setBio] = useState(user.user_metadata.bio);

  return (
    <FormControl>
      <Label fontWeight="bold">Share a bio?</Label>
      <Textarea
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
          onChange({ user_metadata: { bio: e.target.value } });
        }}
      />
      <HelpText>
        This is sometimes displayed when you&apos;re listed on our websites.
      </HelpText>
    </FormControl>
  );
};
Bio.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Bio.provides = 'user_metadata.bio';
export default Bio;
