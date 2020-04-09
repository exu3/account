import React, { useState } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import Button from '@codeday/topo/Button';
import { updateUserProfile } from '../utils/profile';

const hasRequired = (required, user, request) => {
  const merged = merge(user, request);
  const missing = required
    .map((str) => {
      try {
        return str.split('.').reduce((o, i) => o[i], merged) || false;
      } catch (ex) {
        return false;
      }
    });
  return missing.filter((res) => !res).length === 0;
};

const SubmitUpdates = ({
  required, user, request, token, onError, onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variantColor="green"
      isDisabled={!request || Object.keys(request).length === 0 || !hasRequired(required, user, request)}
      isLoading={isLoading}
      onClick={async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          await updateUserProfile(request, token);
          onSubmit();
        } catch (err) {
          if (err.response.data && err.response.data.error) onError(err.response.data.error);
        }
        setIsLoading(false);
      }}
    >
      Update Profile
    </Button>
  );
};
SubmitUpdates.propTypes = {
  required: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  token: PropTypes.string,
  onError: PropTypes.func,
  onSubmit: PropTypes.func,
};
SubmitUpdates.defaultProps = {
  required: [],
  token: null,
  onError: () => {},
  onSubmit: () => {},
};
export default SubmitUpdates;
