import React from 'react';
import {render, screen} from '@testing-library/react';
import {WeatherWidget} from "./weatherWidget";

const result = {
    errorMsg: "errorMsg",
    loadingMsg: "loadingMsg",
    weatherData: null,
    cityData: null
};
jest.mock('../hooks/useFetchWeather', () => {
    useFetchWeather: jest.fn().mockImplementationOnce(() => result)
})
describe('WeatherWidget', () => {
    test('renders WeatherWidget', () => {
        render(<WeatherWidget apiKey="YourAPIKey"/>);
        const linkElement = screen.getByText(/CURRENT WEATHER/i);
        expect(linkElement).toBeInTheDocument();
    });
});