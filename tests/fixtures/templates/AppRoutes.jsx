/*eslint-disable react/prop-types */

import React from 'react';
import {Switch, Route} from 'react-router';
import AppDefault from './AppDefault';
import Other from './Other';

export default (
  <Switch>
    <Route path='/default' component={AppDefault} />
    <Route path='/others' component={Other} />
  </Switch>
);
