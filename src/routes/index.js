import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'pages/login';
import Students from 'pages/students';
import Student from 'pages/students/subpage';
import Register from 'pages/register';
import PageNotFound from 'pages/404';
import Photos from 'pages/students/subpage/photo';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Students} />
      <PrivateRoute path="/student" exact component={Student} />
      <PrivateRoute path="/student/:id" exact component={Student} />
      <PrivateRoute path="/student/photo/:id" exact component={Photos} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  );
}
