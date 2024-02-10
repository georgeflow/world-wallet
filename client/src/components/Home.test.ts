/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { useContextHook } from '../Context';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

jest.mock('./NetWorth', () => () => <div>NetWorth Component</div>);
jest.mock('./Accounts', () => () => <div>Accounts Component</div>);

describe('Home Component Tests', () => {
  it('redirects to login when not authenticated', () => {
    useContextHook.mockReturnValue({ isAuthenticated: false });

    const { container } = render(
      <Router>
        <Home />
      </Router>,
    );

    // Check for redirection or absence of certain elements
    // The exact assertion depends on how you handle the redirection in your app
  });

  it('renders NetWorth and Accounts when authenticated', () => {
    useContextHook.mockReturnValue({ isAuthenticated: true });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('NetWorth Component')).toBeInTheDocument();
    expect(screen.getByText('Accounts Component')).toBeInTheDocument();
  });

  // Additional tests can be added for other child components
});
