/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from './DropDown';
import { useContextHook } from '../Context';

jest.mock('../Context', () => ({
  useContextHook: jest.fn(),
}));

describe('DropDown Component Tests', () => {
  it('renders with default options', () => {
    useContextHook.mockReturnValue({ setCurrency: jest.fn() });

    render(<DropDown />);

    expect(screen.getByText('$ USD')).toBeInTheDocument();
    expect(screen.getByText('€ EUR')).toBeInTheDocument();
    expect(screen.getByText('£ GBP')).toBeInTheDocument();
  });

  it('calls setCurrency on option change', () => {
    const setCurrencyMock = jest.fn();
    useContextHook.mockReturnValue({ setCurrency: setCurrencyMock });

    render(<DropDown />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'EUR' },
    });

    expect(setCurrencyMock).toHaveBeenCalledWith('EUR');
  });
});
