import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows the eggplant dashboard and growing stages', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /growing something wonderful/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /meet your black beauty/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /your growing story/i })).toBeInTheDocument();
  expect(screen.getByText('Pick while they shine')).toBeInTheDocument();
});

test('lets the gardener check off care tasks', () => {
  render(<App />);

  expect(screen.getByText('1/3 done')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /check the top inch of soil/i }));

  expect(screen.getByText('2/3 done')).toBeInTheDocument();
});

test('saves a garden journal note', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add a garden note/i }));

  fireEvent.change(screen.getByRole('textbox', { name: /your garden note/i }), {
    target: { value: 'A new flower opened today.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /save note/i }));

  expect(screen.getByText('A new flower opened today.', { selector: '.saved-note p' })).toBeInTheDocument();
  expect(screen.getByText('LATEST GARDEN NOTE')).toBeInTheDocument();
});
