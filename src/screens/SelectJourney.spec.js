import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import Api from '../api/Api';
import SelectJourney from './SelectJourney';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

describe('SelectJourney Screen', () => {
  beforeEach(() => {
    useLocation.mockImplementation(() => ({
      state: {
        message_id: '12345',
        provider: {},
        locations: [],
      },
    }));
    Api.poll = jest
      .fn()
      .mockImplementation((getStatusResult) => getStatusResult());
  });
  it('Should display header and footer', () => {
    render(<SelectJourney />);
    expect(screen.getByAltText('ONDC')).toBeInTheDocument();
    expect(screen.getByText('Powered by ONDC')).toBeInTheDocument();
  });
});
