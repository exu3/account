import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import Box from '@codeday/topo/Atom/Box';
import getPropertyComponents from './UserProperty';

const UserProperties = ({ user, fields, onChange, token }) => {
  const [components, setComponents] = useState([]);
  const [_, dispatchChange] = useReducer((state, change) => {
    let merged = merge(state, change);
    if (change.badges) {
      merged.badges = change.badges
    }
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
                  token
                })
              }
            </Box>
          ),
        };
      }));
  }, [user, JSON.stringify(fields)]);

  return components.map((obj) => obj.element);
};
UserProperties.propTypes = {
  user: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
};
UserProperties.defaultProps = {
  user: {},
  token: null,
  onChange: () => { },
};

export default React.memo(UserProperties);
