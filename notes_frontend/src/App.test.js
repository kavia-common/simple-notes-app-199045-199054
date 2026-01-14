import { render, screen } from '@testing-library/react';
import App from './App';

test('renders core notes UI', () => {
  render(<App />);

  // Header primary action
  expect(screen.getByRole('button', { name: /add note/i })).toBeInTheDocument();

  // Search input
  expect(screen.getByLabelText(/search notes/i)).toBeInTheDocument();
});
