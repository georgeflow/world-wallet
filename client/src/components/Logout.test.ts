/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Logout from './Logout';
import apiService from '../ApiService';
import { useContextHook } from '../Context';
import { useNavigate } from 'react-router-dom';

jest.mock('../ApiService', () => ({
  logout: jest.fn(),
}));

jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Logout Component Tests', () => {
  it('renders correctly', () => {
    useContextHook.mockReturnValue({ setIsAuthenticated: jest.fn() });
    useNavigate.mockReturnValue(jest.fn());

    render(
      <Router>
        <Logout />
      </Router>,
    );

    expect(
      screen.getByText('Are you sure you want to log out?'),
    ).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('calls logout functions on click', () => {
    const setIsAuthenticated = jest.fn();
    useContextHook.mockReturnValue({ setIsAuthenticated });
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <Logout />
      </Router>,
    );

    fireEvent.click(screen.getByText('Yes'));

    expect(apiService.logout).toHaveBeenCalled();
    expect(setIsAuthenticated).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
