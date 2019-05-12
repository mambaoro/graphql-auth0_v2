/**
 *
 * GuardedRoute
 *
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function GuardedRoute(props) {
  const { component: Component, path, auth } = props;
  return (
    <Route
      exact
      path={path}
      render={() =>
        !auth.isAuthenticated() ? (
          auth.login()
        ) : (
          <Component auth={auth} {...props} />
        )
      }
    />
  );
}

GuardedRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  auth: PropTypes.object,
};

export default GuardedRoute;
