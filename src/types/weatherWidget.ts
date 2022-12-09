export interface CurrentWeatherData {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
}

export interface WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeatherData;
}

export type OpenWeatherMapExclude =
    ['main'] |
    ['daily'] |
    ['hourly'] |
    ['minutely'] |
    ['daily', 'hourly'] |
    ['main', 'daily'] |
    ['main', 'hourly'] |
    ['main', 'minutely'] |
    ['daily', 'hourly', 'minutely'] |
    ['main', 'daily', 'minutely'] |
    ['main', 'hourly', 'minutely'] |
    null |
    undefined;

interface CurrentCity  {
    country: string;
    lat: number;
    lon: number;
    name: string;
    state: string;
    local_names: {
        ca: string,
        lt: string
    };
}

export interface CurrentCityData  extends Array<CurrentCity>{}