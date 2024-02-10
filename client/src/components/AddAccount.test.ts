/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import AddAccount from './AddAccount';

describe('AddAccount Component Tests', () => {
  it('renders without crashing', () => {
    render(<AddAccount />);
    // Since the component doesn't have any specific text or elements to test for,
    // simply rendering it without an error is sufficient for this test.
  });
});
