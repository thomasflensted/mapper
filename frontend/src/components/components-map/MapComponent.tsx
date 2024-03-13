import { Map } from 'react-map-gl';
import { ReactNode, useState, useRef, useEffect } from "react";
import { Places, View, Place } from "../../types/miscTypes";
import mapboxgl from 'mapbox-gl';
import MarkerComponent from "./MarkerComponent";
import PopUpWithSignUpButton from "./PopUpWithSignUpButton";
import PopUpWithInfo from "./PopUpWithInfo";
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type MapView = { longitude: number, latitude: number, zoom: number };

type MapComponentProps = {
    children: ReactNode,
    places: Places,
    setCurrentPlace: React.Dispatch<React.SetStateAction<Place | null>>,
    currentPlace: Place | null,
    view: View,
}

const MapComponent = ({ children, places, setCurrentPlace, currentPlace, view }: MapComponentProps) => {

    const mapRef = useRef<any>(null);
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showMarkerPopup, setShowMarkerPopup] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 })
    const [currentPlaceIsVisible, setCurrentPlaceIsVisible] = useState<boolean>(true);

    useEffect(() => {
        if (currentPlace) setCurrentPlaceIsVisible(places.includes(currentPlace));
        if (view === 'list' && currentPlace) mapRef.current.flyTo({
            center: [currentPlace.coordinates[0], currentPlace.coordinates[1]]
        })
    }, [currentPlace, places])

    const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
        setCurrentPlace(null)
        setClickCoordinates(e.lngLat)
        setShowMarkerPopup(false)
        setShowMapPopup(true);
    }

    const handleMarkerClick = (e: any, place: Place) => {
        e.originalEvent.stopImmediatePropagation();
        setCurrentPlace(place);
        setShowMapPopup(false);
        setShowMarkerPopup(true)
    }

    const initialView: MapView = { longitude: 15, latitude: 20, zoom: 1.5 }

    return (
        <Map
            ref={mapRef}
            onZoom={() => setShowMapPopup(false)}
            onClick={(e) => handleMapClick(e)}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/thomasflensted/clltb8sq500aq01qx45ve35k7"
            initialViewState={initialView}>
            {places.map(place =>
                <MarkerComponent
                    key={place.coordinates[0]}
                    place={place}
                    handleClick={handleMarkerClick}
                    size={(currentPlace?.name === place.name && view === 'list') ? 'scale-125' : 'scale-100'} />)}
            {showMapPopup && (
                <PopUpWithSignUpButton
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}
            {showMarkerPopup && view == 'marker' && currentPlaceIsVisible && (
                <PopUpWithInfo
                    place={currentPlace}
                    setShowPopUp={setShowMarkerPopup} />)}
            {children}
        </Map >
    )
}

export default MapComponent