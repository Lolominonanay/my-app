import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows the eggplant dashboard and growing stages', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /growing something wonderful/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /meet your black beauty/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /your growing story/i })).toBeInTheDocument();
  expect(screen.getByText('Pick while they shine')).toBeInTheDocument();
});

test('shows the tomato page with its own growth stages and care guide', () => {
  window.history.replaceState({}, '', '/?plant=tomato');
  render(<App />);

  expect(screen.getByRole('heading', { name: /meet your sungold/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /ripe tomatoes growing on a leafy vine/i })).toBeInTheDocument();
  expect(screen.getByText('Fruit set')).toBeInTheDocument();
  expect(screen.getByText('Water deeply at the base')).toBeInTheDocument();
  expect(screen.getByText('Pick at peak color')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /sungold tomato current/i })).toHaveAttribute('aria-current', 'page');
  expect(document.title).toBe('Little Plot — Tomato growing journal');
});

test('lets the gardener check off care tasks', () => {
  window.history.replaceState({}, '', '/');
  render(<App />);

  expect(screen.getByText('1/3 done')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /check the top inch of soil/i }));

  expect(screen.getByText('2/3 done')).toBeInTheDocument();
});

test('saves a garden journal note', () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add a garden note/i }));

  fireEvent.change(screen.getByRole('textbox', { name: /your garden note/i }), {
    target: { value: 'A new flower opened today.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /save note/i }));

  expect(screen.getByText('A new flower opened today.', { selector: '.saved-note p' })).toBeInTheDocument();
  expect(screen.getByText('LATEST GARDEN NOTE')).toBeInTheDocument();
});
