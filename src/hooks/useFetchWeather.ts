import useAsync from '../hooks/useAsync';
import useGeoLocation from './useGeoLocation';
import {CurrentCityData, OpenWeatherMapExclude, WeatherData} from '../types/weatherWidget';
import { WEATHER_API_URL, GEO_API_URL } from '../config';
import { getLocalStorageValue, addLocalStorageValue} from "../shared/localStorage";

/**
 * OpenWeatherMapExclude
 * @param key api key from openweathermap
 * @param units
 *        For temperature in Fahrenheit, use units=imperial
 *        For temperature in Celsius, use units=metric
 *        Kelvin is used by default, so there is no need to use the units parameter in the API call if you want this
 * @param exclude https://openweathermap.org/api/one-call-api
 * @param geo optional for latitude and longitude
 */
export default function useFetchWeather(
  key: string,
  units?: string,
  exclude?: OpenWeatherMapExclude,
  geo?: {
    lat: string,
    lon: string
  } | undefined
) {

  const { latitude, longitude, loading, error, shouldDetectLocation } = useGeoLocation(!!geo);

  const state = useAsync(async () => {
    if (loading) return { loading: true };
    if (error) return { error, loading: false };

    const resultFromLocalStorage = getLocalStorageValue(latitude, longitude);
    if(resultFromLocalStorage) {
      return resultFromLocalStorage;
    }

    const url = `${WEATHER_API_URL}` +
      `lat=${geo?.lat || latitude}` +
      `&lon=${geo?.lon || longitude}` +
      `${units ? `&units=${units}` : ''}` +
      `${exclude ? `&exclude=${exclude.join(',')}` : ''}` +
      `&appid=${key}`;

    const response = await fetch(url);
    const result = await response.json();
    addLocalStorageValue(latitude, longitude, result);
    return result;
  }, [latitude, longitude, loading, error]);

  const stateGeo = useAsync(async () => {
    if (loading) return { loading: true };
    if (error) return { error, loading: false };

    const resultFromLocalStorage = getLocalStorageValue(latitude, longitude, 'City');
    if(resultFromLocalStorage) {
      return resultFromLocalStorage;
    }

    const url = `${GEO_API_URL}` +
        `lat=${geo?.lat || latitude}` +
        `&lon=${geo?.lon || longitude}` +
        `&limit=1`+
        `&appid=${key}`;

    const response = await fetch(url);
    const result = await response.json();
    addLocalStorageValue(latitude, longitude, result, 'City');
    return result;
  }, [latitude, longitude, loading, error]);


  const errorMsg: string | undefined = state.value?.error?.message ||
      state.error?.message ||
      stateGeo.value?.error?.message ||
      stateGeo.error?.message;

  let loadingMsg: string | null = null;

  if (shouldDetectLocation) {
    if (loading) {
      loadingMsg = 'Geo Locating ...';
    } else if (!state.value.timezone && !errorMsg) {
      loadingMsg = 'Fetching Weather Data ...';
    }
  } else {
    if (state.loading && !errorMsg) {
      loadingMsg = 'Fetching Weather Data ...';
    }
  }

  const weatherData: WeatherData | null = state.value ? state.value : null;
  const cityData: CurrentCityData | null = stateGeo.value? stateGeo.value: null;

  return {
    errorMsg: errorMsg,
    loadingMsg: loadingMsg,
    weatherData: weatherData,
    cityData: cityData
  };
}