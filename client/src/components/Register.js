import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, registerUser, showAlert, alertText, alertShown, user } =
    useAppContext();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alertShown();
      return;
    }
    const data = { name, email, password };
    registerUser(data);
  };

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate('/');
      }
    }, 3000);
  }, [user, navigate]);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <h1>Register</h1>
      {showAlert && (
        <h1 style={{ color: 'red', marginBottom: '5px' }}>{alertText}</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          required
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='name'>Password</label>
        <input
          type='password'
          name='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </>
  );
};

export default Register;
