import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: '2rem',
        }}
      >
        <Link to='/login' style={{ paddingRight: '10px' }}>
          Login
        </Link>
        <Link to='/register'>Register</Link>
      </nav>
    </>
  );
};

export default Home;
