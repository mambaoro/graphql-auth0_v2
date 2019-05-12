/**
 *
 * Nav
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

function Nav(props) {
  const goTo = route => props.history.replace(`/${route || ''}`);
  const login = () => props.auth.login();
  const logout = () => props.auth.logout();
  const { isAuthenticated } = props.auth;
  const [isRefreshed, setRefresh] = useState(null);
  useEffect(() => setRefresh(false));
  return (
    <div>
      {isRefreshed === false && setRefresh(true)}
      <nav className="nav">
        <div>
          <Link to="/">Cool Reads</Link>
        </div>
        {isAuthenticated() && (
          <Link
            to="/create"
            className="nav-item"
            style={{ marginLeft: '10px' }}
          >
            Create Book
          </Link>
        )}
        <button type="button" onClick={() => goTo()} className="nav-item">
          List Books
        </button>
        {!isAuthenticated() && (
          <button type="button" onClick={() => login()} className="nav-item">
            Log In
          </button>
        )}
        {isAuthenticated() && (
          <button type="button" onClick={() => logout()}>
            Log Out
          </button>
        )}
      </nav>
    </div>
  );
}

Nav.propTypes = {
  history: PropTypes.object,
  auth: PropTypes.object,
};

export default withRouter(Nav);
