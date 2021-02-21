import React from 'react';
import Page from '../../components/Page';
import Button from '@codeday/topo/Atom/Button';

export default () => (
  <Page isLoggedIn={false}>
    <p>Discord account successfuly linked!</p>
    <Button
      size="xs"
      href="/"
      as="a">
      Click here to return to the main page.
    </Button>
  </Page>
);
