/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component Tests', () => {
  it('renders Register component for /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Register Form')).toBeInTheDocument();
  });

  it('renders Login component for /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  it('renders Home component for / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });
});

