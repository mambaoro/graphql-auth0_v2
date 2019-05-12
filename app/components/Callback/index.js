/**
 *
 * Callback
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import loading from '../loading.svg';

function Callback(props) {
  useEffect(() => props.history.replace('/'));
  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: '100vw',
    width: '100vw',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backGroundColor: 'white',
  };
  return (
    <div style={style}>
      <img src={loading} alt="loading" />
    </div>
  );
}

Callback.propTypes = {
  history: PropTypes.object,
};

export default Callback;
