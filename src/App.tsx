import React from 'react';
import './App.scss';
import {WeatherWidget} from "./components/weatherWidget";

function App() {
    return (
        <div className="widget">
            <WeatherWidget apiKey="PleaseInsertHereYourAPIKey"></WeatherWidget>
        </div>
    );
}

export default App;
