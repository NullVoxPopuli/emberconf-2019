import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './index';
import ComponentDemo from './component-demo';

export default function RootRoute() {
  return (
    <Switch>
      <Route exact path='/' component={Index} />
      <Route path='/component-demo' component={ComponentDemo} />
    </Switch>
  );
}
