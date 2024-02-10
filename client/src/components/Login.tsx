import React, { ChangeEvent, FormEvent, useState } from 'react';
import auth from '../utils/auth';
import apiService from '../ApiService';
import { useNavigate, Navigate } from 'react-router-dom';
import { useContextHook } from '../Context';

interface LoginFormState {
  email: string;
  password: string;
}

const initialState: LoginFormState = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  let navigate = useNavigate();
  const [state, setState] = useState<LoginFormState>(initialState);
  const { setIsAuthenticated, isAuthenticated } = useContextHook();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      setIsAuthenticated(true);
      auth.login(() => navigate('/'));
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };
  return (
    <section>
      {isAuthenticated && <Navigate to='/' />}
      <h2>Login</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name@mail.com'
          name='email'
          value={state.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='supersecretthingy'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
        <button className='form-submit' type='submit' disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
  );
};


export default Login;

