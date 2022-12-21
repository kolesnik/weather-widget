import {FC, useEffect, useState} from "react";
import useFetchWeather from "../hooks/useFetchWeather";
import "./weatherWidget.scss";
import {RadioButton} from "./radioButton"
export interface WeatherWidgetPorps {
    apiKey: string;
}

export const WeatherWidget: FC<WeatherWidgetPorps> = ({ apiKey}) => {
    const {
        errorMsg,
        loadingMsg,
        weatherData,
        cityData
    } = useFetchWeather(apiKey, 'metric', ['daily', 'hourly', 'minutely']);

    const [scale, setScale] = useState("C");
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        if (weatherData && weatherData.current )
            setTemperature(Math.round(weatherData?.current.temp));
    }, [weatherData]);

    const getTime = (timeStamp: number | undefined) => {
        if(!timeStamp) return '';
        const hours = new Date(timeStamp * 1000).getHours();
        const minutes = new Date(timeStamp * 1000).getMinutes();
        return `${hours > 9 ? hours: '0'+ hours} : ${minutes > 9 ? minutes: '0'+ minutes}`
    }

    if (loadingMsg) {
        return (
            <p className="state-notification">{loadingMsg}</p>
        );
    }

    if (errorMsg) {
        return (
            <p className="state-notification">{errorMsg}</p>
        );
    }

    const radioChangeHandler = (e: React.MouseEvent<HTMLElement>) => {
        const scale = (e.target as HTMLInputElement).value;
        if (scale === 'F') {
            setTemperature(Math.round(temperature * 1.8 + 32))
        } else {
            const value = weatherData?.current.temp !== undefined? weatherData?.current.temp: ((temperature - 32) / 1.8);
            setTemperature(Math.round(value));
        }
        setScale(scale);
    };


    return (<div className="weather-widget">
            <div className="full">
                <p>CURRENT WEATHER</p>

                <p>{temperature}&deg; {scale} | {weatherData?.current.weather[0].main}</p>

                <p>{cityData && cityData[0].name }, {cityData && cityData[0].country}</p>
            </div>
            <br/>
            <div className="two-column">
                <div className="left">
                    <p>HUMIDITY</p>
                    <p>WIND</p>
                    <p>SUNRISE</p>
                    <p>SUNSET</p>
                </div>
                <div className="right">
                    <p>{weatherData?.current.humidity}%</p>
                    <p>{weatherData?.current.wind_speed} M/S</p>
                    <p>{getTime(weatherData?.current.sunrise)}</p>
                    <p>{getTime(weatherData?.current.sunset)}</p>
                </div>
            </div>
            <div className="full radio-btn-container">
                <RadioButton
                    changed={radioChangeHandler}
                    id="1"
                    isSelected={scale === "C"}
                    label="C"
                    value="C"
                />
                <RadioButton
                    changed={radioChangeHandler}
                    id="2"
                    isSelected={scale === "F"}
                    label="F"
                    value="F"
                />
            </div>
        </div>
    );
}