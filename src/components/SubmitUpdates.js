import React, { useState } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import Button from '@codeday/topo/Atom/Button';
import { submitUserChanges } from '../util/profile';
import { useToasts } from '@codeday/topo/utils';

const hasRequired = (required, user, changes) => {
  const merged = merge(user, changes);
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

const SubmitUpdates = ({ changes, user, required, onSubmit, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error, info } = useToasts();
  delete changes._meta
  return (
    <Button
      bg="success.bg"
      textColor="white"
      isDisabled={!changes || Object.keys(changes).length === 0 || !hasRequired(required, user, changes)}
      isLoading={isLoading}
      onClick={async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          await submitUserChanges(changes, token);
          success("Changes Saved!")
          onSubmit()
        } catch (err) {
          error(err.errors ? err?.errors[0]?.data?.message : err?.message)
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
  changes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};
SubmitUpdates.defaultProps = {
  required: [],
  onError: () => { },
  onSubmit: () => { },
};
export default SubmitUpdates;
