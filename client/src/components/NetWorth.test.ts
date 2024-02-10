/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import NetWorth from './NetWorth';
import { ContextProvider, useContextHook } from '../Context';

// Mock the useContextHook
jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

describe('NetWorth Component Tests', () => {
  it('renders correctly with initial state', () => {
    useContextHook.mockReturnValue({ loading: true });

    render(<NetWorth />);
    expect(screen.getByText('Total net worth (undefined)')).toBeInTheDocument();
  });

  it('displays calculated net worth', () => {
    useContextHook.mockReturnValue({
      loading: false,
      currency: 'USD',
      balances: [{ balances: { available: 1000, current: 1500 } }],
      liabilities: [{ balances: { current: 500, available: null } }],
    });

    render(<NetWorth />);
    expect(screen.getByText('Total net worth (USD)')).toBeInTheDocument();
    expect(screen.getByText('Balances: 1000')).toBeInTheDocument();
    expect(screen.getByText('Liabilities: 500')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument(); // Net Worth
  });

  // Add more tests for different data scenarios
});
