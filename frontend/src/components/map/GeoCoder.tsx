import { useControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const GeoCoder = () => {

    const GeoCoder = () => {
        useControl(() => new MapboxGeocoder({
            accessToken: TOKEN,
            clearOnBlur: true,
            clearAndBlurOnEsc: true,
            mapboxgl: mapboxgl,
        }));
        return null;
    }

    return (
        <GeoCoder />
    )
}

export default GeoCoder