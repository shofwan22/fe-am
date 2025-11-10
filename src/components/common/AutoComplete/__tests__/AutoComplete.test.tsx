import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutoComplete from '../index';

describe('AutoComplete', () => {
  const mockEndpoint = 'http://localhost:4001/departments';
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch globally
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'Engineering' },
            { id: 2, name: 'Finance' },
          ]),
      })
    ) as unknown as typeof fetch;
  });

  it('renders input field', () => {
    render(
      <AutoComplete endpoint={mockEndpoint} value="" onSelect={mockOnSelect} />
    );
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input).toBeInTheDocument();
  });

  it('fetches and shows options based on input', async () => {
    render(
      <AutoComplete endpoint={mockEndpoint} value="" onSelect={mockOnSelect} />
    );
    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Fin' } });

    await waitFor(() =>
      expect(screen.getByText('Finance')).toBeInTheDocument()
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('name_like=Fin')
    );
  });

  it('calls onSelect and updates input when option clicked', async () => {
    render(
      <AutoComplete endpoint={mockEndpoint} value="" onSelect={mockOnSelect} />
    );
    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Eng' } });

    await waitFor(() =>
      expect(screen.getByText('Engineering')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Engineering'));

    expect(mockOnSelect).toHaveBeenCalledWith('Engineering');
    expect(input).toHaveValue('Engineering');
  });
});
