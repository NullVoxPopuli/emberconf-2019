import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './index';

export default function RootRoute() {
  return (
    <Switch>
      <Route exact path='/' component={Index} />
    </Switch>
  );
}
