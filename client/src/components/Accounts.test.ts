import React from 'react';
import { render, screen } from '@testing-library/react';
import Accounts from './Accounts';
import { useContextHook } from '../Context';

jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

describe('Accounts Component Tests', () => {
  it('renders PlaidLink components', () => {
    useContextHook.mockReturnValue({
      loading: false,
      data: null,
      balances: [],
      liabilities: [],
    });

    render(<Accounts />);

    expect(screen.getAllByText(/Link/)).toHaveLength(3); // Assuming 'Link' is part of the text in PlaidLink
  });

  it('displays account balances and liabilities', () => {
    const mockBalances = [
      {
        name: 'Account1',
        balances: { available: 100, iso_currency_code: 'USD' },
      },
    ];
    const mockLiabilities = [
      { name: 'Loan1', balances: { current: 200, iso_currency_code: 'USD' } },
    ];

    useContextHook.mockReturnValue({
      loading: false,
      data: true,
      balances: mockBalances,
      liabilities: mockLiabilities,
    });

    render(<Accounts />);

    expect(screen.getByText('100 USD')).toBeInTheDocument();
    expect(screen.getByText('Account1')).toBeInTheDocument();
    expect(screen.getByText('200 USD')).toBeInTheDocument();
    expect(screen.getByText('Loan1')).toBeInTheDocument();
  });
});
