/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Graph from './Graph';

describe('Graph Component Tests', () => {
  it('renders correctly', () => {
    render(<Graph />);
    expect(screen.getByText('Net Worth Tracker')).toBeInTheDocument();
  });
});
