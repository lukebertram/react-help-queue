import React from 'react';
import { Link } from 'react-router-dom';
import reactLogo from '../assets/images/react-logo.svg';

function Header(){
  let logoStyle ={
    width: 500
  };
  return(
    <div>
      <img src={reactLogo} style={logoStyle} />
      <h1>Hot modules, dawg!</h1>
      <Link to="/">Home</Link> | <Link to="/newticket">Create Ticket</Link>
    </div>
  );
}

export default Header;
