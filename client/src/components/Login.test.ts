/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import apiService from '../ApiService';
import { useContextHook } from '../Context';

jest.mock('../ApiService', () => ({
  login: jest.fn(),
}));

jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component Tests', () => {
  it('renders correctly', () => {
    useContextHook.mockReturnValue({
      isAuthenticated: false,
      setIsAuthenticated: jest.fn(),
    });

    render(
      <Router>
        <Login />
      </Router>,
    );

    expect(screen.getByPlaceholderText('name@mail.com')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('supersecretthingy'),
    ).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    useContextHook.mockReturnValue({
      isAuthenticated: false,
      setIsAuthenticated: jest.fn(),
    });

    render(
      <Router>
        <Login />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText('name@mail.com'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('supersecretthingy'), {
      target: { value: 'password' },
    });

    expect(screen.getByDisplayValue('test@mail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });
});
