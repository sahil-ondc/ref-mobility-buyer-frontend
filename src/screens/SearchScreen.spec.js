import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchScreen from './SearchScreen';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useHistory: jest.fn(),
  };
});

describe('Search Screen', () => {
  it('should display header', async () => {
    render(<SearchScreen />);
    expect(screen.getByAltText('ONDC'));
  });
});
