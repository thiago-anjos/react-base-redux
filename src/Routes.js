import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Login from './pages/login';
import Home from './pages/home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  );
}
