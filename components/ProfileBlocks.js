import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import Box from '@codeday/topo/Box';
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
          element: (
            <Box paddingBottom="2" key={Array.isArray(component.provides) ? component.provides[0] : component.provides}>
              {
                React.createElement(component, {
                  user,
                  onChange: dispatchChange,
                })
              }
            </Box>
          ),
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
