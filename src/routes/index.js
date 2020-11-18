import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'pages/login';
import Home from 'pages/home';
import PageNotFound from 'pages/404';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  );
}
