/* eslint-disable react/prop-types */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ListBook from '../../components/ListBook/Loadable';
import CreateBook from '../../components/CreateBook/Loadable';
import Nav from '../../components/Nav/Loadable';
import Callback from '../../components/Callback/Loadable';
import GuardedRoute from '../../components/GuardedRoute/Loadable';

import GlobalStyle from '../../global-styles';

import auth from './Auth';

const handleAuthentication = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

function App(props) {
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      auth.renewSession();
    }
  }, []);
  return (
    <div>
      <Nav auth={auth} />
      <Switch>
        <Route exact path="/" render={() => <ListBook {...props} />} />
        <GuardedRoute path="/create" component={CreateBook} auth={auth} />
        <Route
          exact
          path="/callback"
          render={() => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

export default withRouter(App);
