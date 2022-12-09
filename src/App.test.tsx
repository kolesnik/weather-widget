import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const result = {
  errorMsg: "errorMsg",
  loadingMsg: "loadingMsg",
  weatherData: null,
  cityData: null
};
jest.mock('../hooks/useFetchWeather', () => {
  useFetchWeather: jest.fn().mockImplementationOnce(() => result)
})

test('renders application', () => {
  render(<App />);
  const linkElement = screen.getByText(/CURRENT WEATHER/i);
  expect(linkElement).toBeInTheDocument();
});
