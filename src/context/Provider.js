import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useApp from './useApp';

function Provider({ children }) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Button, setButton] = useState('');

  const contextValue = {
    Email,
    setEmail,
    Password,
    setPassword,
    Button,
  };

  useEffect(() => {
    const number = 6;
    const valid = /\S+@\S+\.\S+/;
    if (valid.test(Email) && Password.length > number) {
      setButton(false);
    } if (!valid.test(Email) || Password.length < number) {
      setButton(true);
    }
  }, [Email, Password]);

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
