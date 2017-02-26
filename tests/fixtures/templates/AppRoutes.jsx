/*eslint-disable react/prop-types */

import React from 'react';
import {Route} from 'react-router';
import App from './App';
import AppDefault from './AppDefault';
import Other from './Other';

export default (
  <Route path='/' component={App}>
    <Route path='/default' component={AppDefault} />
    <Route path='/others' component={Other} />
  </Route>
);
