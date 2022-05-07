import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, registerUser } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, password };
    registerUser(data);
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <h1>Register</h1>

      <form>
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
        <button type='submit' onClick={handleSubmit}>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
