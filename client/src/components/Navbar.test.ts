/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import { useContextHook } from '../Context';

// Mock the useContextHook
jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

describe('Navbar Component Tests', () => {
  it('renders correctly', () => {
    useContextHook.mockReturnValue({ isAuthenticated: false });

    render(
      <Router>
        <Navbar />
      </Router>,
    );

    expect(screen.getByText('worldwallet')).toBeInTheDocument();
  });

  it('displays login and register links when not authenticated', () => {
    useContextHook.mockReturnValue({ isAuthenticated: false });

    render(
      <Router>
        <Navbar />
      </Router>,
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('displays logout link when authenticated', () => {
    useContextHook.mockReturnValue({ isAuthenticated: true });

    render(
      <Router>
        <Navbar />
      </Router>,
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
