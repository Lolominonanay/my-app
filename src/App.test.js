import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
      current: { temperature_2m: 31.6, weather_code: 0 },
      daily: { temperature_2m_max: [35.2], temperature_2m_min: [26.7] },
    }),
  });
});

test('shows Manila current weather and today’s forecast', async () => {
  render(<App />);

  expect(screen.getByText('Manila, Philippines')).toBeInTheDocument();
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
  expect(screen.getByText('32')).toBeInTheDocument();
  expect(screen.getByText('Clear skies')).toBeInTheDocument();
  expect(global.fetch.mock.calls[0][0]).toContain('timezone=Asia%2FManila');
});

test('shows Justin Arias consistently in the garden and profile', () => {
  render(<App />);

  expect(screen.getByText('Justin’s garden')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: "Justin's profile" })).toHaveTextContent('Justin Arias');
  expect(screen.queryByText(/Maya|Chen/i)).not.toBeInTheDocument();
});

test('shows a plant count matching the five available plants', () => {
  render(<App />);

  expect(screen.getByText('My plants').parentElement).toHaveTextContent('5');
  expect(screen.getByRole('navigation', { name: 'Choose a plant' }).querySelectorAll('a')).toHaveLength(5);
});

test('shows an error and retry when the weather service is unavailable', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Offline'));
  render(<App />);

  expect(await screen.findByText('Weather unavailable')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /try again/i }));

  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});

test('shows the eggplant dashboard and growing stages', async () => {
  render(<App />);

  expect(screen.getByRole('group', { name: 'Plant 01 of 05' })).toHaveTextContent('01 / 05');
  expect(screen.getByRole('heading', { name: /growing something wonderful/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /meet your black beauty/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /your growing story/i })).toBeInTheDocument();
  expect(screen.getByText('Pick while they shine')).toBeInTheDocument();
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});

test('shows the tomato page with its own growth stages and care guide', async () => {
  window.history.replaceState({}, '', '/?plant=tomato');
  render(<App />);

  expect(screen.getByRole('heading', { name: /meet your sungold/i })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Plant 02 of 05' })).toHaveTextContent('02 / 05');
  expect(screen.getByRole('img', { name: /ripe tomatoes growing on a leafy vine/i })).toBeInTheDocument();
  expect(screen.getByText('Fruit set')).toBeInTheDocument();
  expect(screen.getByText('Water deeply at the base')).toBeInTheDocument();
  expect(screen.getByText('Pick at peak color')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /sungold tomato current/i })).toHaveAttribute('aria-current', 'page');
  expect(document.title).toBe('Little Plot — Tomato growing journal');
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});

test.each([
  {
    slug: 'okra',
    heading: /meet your clemson spineless/i,
    counter: 'Plant 03 of 05',
    image: /okra pods growing on a leafy plant/i,
    stage: 'Young pods',
    task: 'Look for tender new pods',
    guide: 'Harvest young and often',
  },
  {
    slug: 'kalabasa',
    heading: /meet your philippine kalabasa/i,
    counter: 'Plant 04 of 05',
    image: /ripe kalabasa squash growing on a vine/i,
    stage: 'Flowers open',
    task: 'Look for fresh yellow flowers',
    guide: 'Let the rind harden',
  },
  {
    slug: 'cucumber',
    heading: /meet your green gem/i,
    counter: 'Plant 05 of 05',
    image: /fresh cucumbers growing on a leafy vine/i,
    stage: 'Fruit set',
    task: 'Check the vine supports',
    guide: 'Pick before seeds enlarge',
  },
])('shows the $slug dashboard with its own guide and plant number', async ({ slug, heading, counter, image, stage, task, guide }) => {
  window.history.replaceState({}, '', `/?plant=${slug}`);
  render(<App />);

  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: counter })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: image })).toBeInTheDocument();
  expect(screen.getByText(stage)).toBeInTheDocument();
  expect(screen.getByText(task)).toBeInTheDocument();
  expect(screen.getByText(guide)).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Choose a plant' }).querySelectorAll('a')).toHaveLength(5);
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});

test('lets the gardener check off care tasks', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);

  expect(screen.getByText('1/3 done')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /check the top inch of soil/i }));

  expect(screen.getByText('2/3 done')).toBeInTheDocument();
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});

test('saves a garden journal note', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add a garden note/i }));

  fireEvent.change(screen.getByRole('textbox', { name: /your garden note/i }), {
    target: { value: 'A new flower opened today.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /save note/i }));

  expect(screen.getByText('A new flower opened today.', { selector: '.saved-note p' })).toBeInTheDocument();
  expect(screen.getByText('LATEST GARDEN NOTE')).toBeInTheDocument();
  expect(await screen.findByText(/H 35° L 27°/)).toBeInTheDocument();
});
