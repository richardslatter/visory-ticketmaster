import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchEvents, { EventItem } from '../pages';
import '@testing-library/jest-dom';

global.fetch = jest.fn((url) => {
  if (url.startsWith('https://app.ticketmaster.com/discovery/v2/events.json')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        _embedded: {
          events: [
            {
              id: '1',
              name: 'Mock Event',
              url: 'http://mockevent.com',
              dates: {
                start: {
                  localDate: '2023-01-01'
                }
              },
              _embedded: {
                venues: [
                  {
                    name: 'Mock Venue',
                    city: {
                      name: 'Mock City'
                    }
                  }
                ]
              }
            }
          ]
        }
      }),
    });
  }
  return Promise.reject(new Error('Network response was not ok'));
}) as jest.Mock;

describe('SearchEvents and EventItem Components', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('EventItem', () => {
    it('renders event information', () => {
      const mockEvent = {
        name: 'Test Event',
        url: 'http://testevent.com',
        dates: {
          start: {
            localDate: '2023-12-18'
          }
        },
        _embedded: {
          venues: [
            {
              name: 'Test Venue',
              city: {
                name: 'Test City'
              }
            }
          ]
        }
      };

      const { getByText } = render(<EventItem event={mockEvent} />);

      expect(getByText('Test Event')).toBeInTheDocument();
      expect(getByText('Date: 2023-12-18')).toBeInTheDocument();
      expect(getByText('Location: Test Venue, Test City')).toBeInTheDocument();
    });
  });


  describe('SearchEvents', () => {
    it('renders form elements', () => {
      render(<SearchEvents />);

      expect(screen.getByLabelText(/Start Time:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/End Time:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Search Events/i })).toBeInTheDocument();
    });

    it('handles form submission and displays results', async () => {
      render(<SearchEvents />);

      fireEvent.change(screen.getByLabelText(/Start Time:/i), {
        target: { value: '2023-01-01T00:00' },
      });
      fireEvent.change(screen.getByLabelText(/End Time:/i), {
        target: { value: '2023-01-02T00:00' },
      });
      fireEvent.change(screen.getByLabelText(/Country:/i), {
        target: { value: 'US' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Search Events/i }));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Mock Event')).toBeInTheDocument();
      }, { timeout: 1000 });
    });

  });
});
