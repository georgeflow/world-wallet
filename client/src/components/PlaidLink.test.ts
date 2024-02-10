/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaidLink from './PlaidLink';
import { ContextProvider } from '../Context'; // Adjust based on your context provider's location

// Mock the usePlaidLink hook
jest.mock('react-plaid-link', () => ({
  usePlaidLink: jest.fn().mockImplementation(() => ({
    open: jest.fn(),
    ready: true,
  })),
}));

describe('PlaidLink Component Interaction Tests', () => {
  it('calls open function when button is clicked', () => {
    const { open } = usePlaidLink();

    render(
      <ContextProvider>
        <PlaidLink flag='🇺🇸' country='USA' />
      </ContextProvider>,
    );

    // Find the button and simulate a user click
    const button = screen.getByRole('button');
    userEvent.click(button);

    // Expect the open function to have been called
    expect(open).toHaveBeenCalled();
  });
});
