import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import getPropertyComponents from './ProfileProperty';

const ProfileBlocks = ({ user, fields, onChange }) => {
  const [components, setComponents] = useState([]);
  const [_, dispatchChange] = useReducer((state, change) => {
    const merged = merge(state, change);
    onChange(merged);
    return merged;
  }, {});

  useEffect(() => {
    setComponents(getPropertyComponents(fields)
      .map((component) => {
        const result = { _: {} };
        return {
          result,
          element: React.createElement(component, {
            user,
            key: Array.isArray(component.provides) ? component.provides[0] : component.provides,
            onChange: dispatchChange,
          }),
        };
      }));
  }, [user, JSON.stringify(fields)]);

  return components.map((obj) => obj.element);
};
ProfileBlocks.propTypes = {
  user: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};
ProfileBlocks.defaultProps = {
  user: { user_metadata: {} },
  onChange: () => {},
};

export default React.memo(ProfileBlocks);
