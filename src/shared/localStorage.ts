import {GeoLocationSensorState} from "../hooks/useGeoLocation";

function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}


export const getLocalStorageValue = (latitude: GeoLocationSensorState['latitude'], longitude: GeoLocationSensorState['longitude'], keySuffix= '') => {
    const key = `WeatherHistory-${latitude},${longitude},${getToday()}${keySuffix}`;
    const initialValue = false;
    try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        // If error also return initialValue
        console.warn(error);
        return initialValue;
    }
}


export const addLocalStorageValue = (latitude: GeoLocationSensorState['latitude'], longitude: GeoLocationSensorState['longitude'], valueToStore: object, keySuffix= '') => {
    const key = `WeatherHistory-${latitude},${longitude},${getToday()}${keySuffix}`;
    try {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
    } catch (error) {
        // A more advanced implementation would handle the error case
        console.warn(error);
    }
}
