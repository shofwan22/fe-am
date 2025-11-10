import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock delay & useDraft
vi.mock('../../utils/delay', () => ({ delay: vi.fn(() => Promise.resolve()) }));
vi.mock('../../hooks/useDraft', () => ({ useDraft: vi.fn() }));

// Mock AutoComplete fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Engineering' }]),
  })
) as unknown as typeof fetch;

// 🧠 Mock WizardStep2 properly — with explicit onComplete prop
vi.mock('../WizardStep2', () => ({
  __esModule: true,
  default: ({ onPrev, onComplete }: any) => (
    <div>
      <h2>Step 2 – Details & Submit</h2>
      <button onClick={onPrev}>Back</button>
      <button data-testid="submit-btn" onClick={() => onComplete?.()}>
        Submit
      </button>
    </div>
  ),
}));

import WizardContainer from '../WizardContainer';

describe('WizardContainer Integration', () => {
  const mockOnComplete = vi.fn();

  it('navigates to Step 2 and calls onComplete when Submit clicked', async () => {
    render(<WizardContainer role="admin" onComplete={mockOnComplete} />);

    // ✅ Fill out Step 1
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: 'Engineering' },
    });
    fireEvent.click(await screen.findByText('Engineering'));

    // ✅ Move to Step 2
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
    });

    expect(await screen.findByText(/Step 2/i)).toBeInTheDocument();

    // ✅ Click Submit (calls onComplete)
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-btn'));
    });

    // ✅ Verify callback fired
    await act(async () => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });
});
