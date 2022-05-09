import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/register');
  };
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
        <Link to='/register' onClick={logoutUser}>
          {user ? 'Logout' : 'Register'}
        </Link>
      </nav>
    </>
  );
};

export default Home;
