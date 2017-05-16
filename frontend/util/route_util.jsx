import { Route, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

// renders component if logged in, otherwise redirects to the login page
const Protected = ({component: Component, path, loggedIn}) => {
  return (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
  );
};

// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

// connect Auth to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
