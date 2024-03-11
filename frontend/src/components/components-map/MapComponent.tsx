import Map from 'react-map-gl';
import { useState } from "react";
import { Places } from "../../types";
import mapboxgl from 'mapbox-gl';
import MarkerComponent from "./MarkerComponent";
import PopUpWithSignUpButton from "./PopUpWithSignUpButton";
import PopUpWithInfo from "./PopUpWithInfo";
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type View = { longitude: number, latitude: number, zoom: number };
export type PlaceData = { name: string, desc: string, type: string }

type MapComponentProps = {
    places: Places,
    setPlace: React.Dispatch<React.SetStateAction<string>>,
}

const MapComponent = ({ places, setPlace }: MapComponentProps) => {

    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showMarkerPopup, setShowMarkerPopup] = useState(false);
    const [placeData, setPlaceData] = useState<PlaceData>({ name: '', desc: '', type: '' });
    const [markerPosition, setMarkerPosition] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 })

    const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
        setPlace('')
        setMarkerPosition(e.lngLat)
        setShowMarkerPopup(false)
        setShowMapPopup(true);
    }

    const handleMarkerClick = (e: any, coords: number[], name: string, desc: string, type: string) => {
        e.originalEvent.stopImmediatePropagation();
        if (name === placeData.name) {
            setShowMarkerPopup(false);
        } else {
            setPlace(name);
            setShowMapPopup(false);
            setMarkerPosition({ lng: coords[0], lat: coords[1] });
            setPlaceData({ name, desc, type });
            setShowMarkerPopup(true)
        }
    }

    const initialView: View = { longitude: 15, latitude: 20, zoom: 1.5 }

    return (
        <Map
            onZoom={() => setShowMapPopup(false)}
            onClick={(e) => handleMapClick(e)}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/thomasflensted/clltb8sq500aq01qx45ve35k7"
            initialViewState={initialView}>
            {places.map(place =>
                <MarkerComponent
                    key={place.coordinates[0]}
                    place={place}
                    handleClick={handleMarkerClick} />)}
            {showMapPopup && (
                <PopUpWithSignUpButton
                    lat={markerPosition.lat}
                    lng={markerPosition.lng}
                    setShowPopUp={setShowMapPopup} />)}
            {showMarkerPopup && (
                <PopUpWithInfo
                    lat={markerPosition.lat}
                    lng={markerPosition.lng}
                    data={placeData}
                    setShowPopUp={setShowMarkerPopup} />)}
        </Map >
    )
}

export default MapComponent