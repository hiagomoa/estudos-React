import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {SignIn} from '../pages/SignIn/SignIn';
import {SignUp} from '../pages/SignUp/SignUp';
import {Dashboard} from '../pages/Dashboard/Dashboard';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />

    </Switch>
  );
}
