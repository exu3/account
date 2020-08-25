import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@codeday/topo/Input/Text';
import FormControl, { Label } from '@codeday/topo/FormControl';
import Text, { Link } from '@codeday/topo/Text';
import Radio, { Group } from '@codeday/topo/Input/Radio';

const CUSTOM = 'custom';
const defaultPronouns = {
  'she/her': 'she/her',
  'he/him': 'he/him',
  'they/them': 'they/them',
  unspecified: 'prefer not to say',
};

const Pronoun = ({ user, onChange }) => {
  const previousPronoun = user.user_metadata.pronoun;
  const previousWasCustom = !(previousPronoun in defaultPronouns) && previousPronoun;

  const [selection, setSelection] = useState(previousWasCustom ? CUSTOM : previousPronoun);
  const [custom, setCustom] = useState(previousWasCustom ? previousPronoun : '');

  const defaultRadios = Object.keys(defaultPronouns)
    .map((k) => <Radio key={k} value={k}>{defaultPronouns[k]}</Radio>);

  const customRadio = (
    <Radio key={CUSTOM} value={CUSTOM}>
      {
        custom || selection === CUSTOM
          ? (
            <Input
              value={custom}
              onChange={(e) => {
                setSelection(CUSTOM);
                setCustom(e.target.value);
                onChange({ user_metadata: { pronoun: e.target.value } });
              }}
            />
          ) : (
            <Text color="gray.500" as="span">(other)</Text>
          )
      }
    </Radio>
  );

  return (
    <FormControl>
      <Label fontWeight="bold">
        Which pronouns do you use?&nbsp;
        <Link
          color="gray.700"
          fontWeight="normal"
          target="_blank"
          href="https://www.glsen.org/activity/pronouns-guide-glsen"
        >
          <sup>(what&apos;s this?)</sup>
        </Link>
      </Label>
      <Group
        value={selection}
        onChange={(e) => {
          const newSelection = e.target.value;
          setSelection(newSelection);
          if (newSelection === CUSTOM) {
            onChange({ user_metadata: { pronoun: custom } });
          } else {
            onChange({ user_metadata: { pronoun: newSelection } });
          }
        }}
      >
        {[...defaultRadios, customRadio]}
      </Group>
    </FormControl>
  );
};
Pronoun.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
Pronoun.provides = 'user_metadata.pronoun';
export default Pronoun;
