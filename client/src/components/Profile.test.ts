/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Profile from './Profile';
import apiService from '../ApiService';

// Mock the apiService
jest.mock('../ApiService', () => ({
  profile: jest.fn(),
}));

describe('Profile Component Tests', () => {
  it('renders with initial state', () => {
    render(<Profile />);
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(
      screen.getByText(`Welcome back, 
              John
               
              Doe
              ! Everything is fine.`),
    ).toBeInTheDocument();
  });

  it('updates state after API call', async () => {
    apiService.profile.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
    });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.findByText(/Doe/)).toBeInTheDocument();
    });
  });
});
