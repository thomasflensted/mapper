import { Map } from 'react-map-gl';
import { ReactNode, useState, useRef, useEffect } from "react";
import { Place, Places } from "../../types/placeTypes";
import { View } from '../../types/mapTypes';
import mapboxgl from 'mapbox-gl';
import MarkerComponent from "./MarkerComponent";
import PopUpWithSignUpButton from "./popups/PopUpWithSignUpButton";
import PopUpWithInfo from "./popups/PopUpWithInfo";
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';
import PopUpWithAddNewButton from './popups/PopUpWithAddNewButton';
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type MapView = { longitude: number, latitude: number, zoom: number };

type MapComponentProps = {
    children: ReactNode,
    filteredPlaces: Places,
    currentPlace: Place | null,
    setCurrentPlace: React.Dispatch<React.SetStateAction<Place | null>>,
    view: View,
    map_id: string
}

const MapComponent = ({ children, filteredPlaces, currentPlace, setCurrentPlace, view, map_id }: MapComponentProps) => {

    const { user } = useAuthContext();
    const mapRef = useRef<any>(null);
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showMarkerPopup, setShowMarkerPopup] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 })
    const [currentPlaceIsVisible, setCurrentPlaceIsVisible] = useState<boolean>(true);

    useEffect(() => {
        if (currentPlace) setCurrentPlaceIsVisible(filteredPlaces.includes(currentPlace));
        if (view === 'list' && currentPlaceIsVisible && currentPlace) mapRef.current.flyTo({
            center: [currentPlace.coordinates[0], currentPlace.coordinates[1]]
        })
    }, [currentPlace, filteredPlaces])

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
            {filteredPlaces.map(place =>
                <MarkerComponent
                    key={place._id}
                    place={place}
                    handleClick={handleMarkerClick}
                    size={(currentPlace?.name === place.name && view === 'list') ? 'scale-125' : 'scale-100'} />)}
            {showMapPopup && !user && (
                <PopUpWithSignUpButton
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}
            {showMapPopup && user && (
                <PopUpWithAddNewButton
                    map_id={map_id}
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}
            {showMarkerPopup && currentPlace && view == 'marker' && currentPlaceIsVisible && (
                <PopUpWithInfo
                    place={currentPlace}
                    setShowPopUp={setShowMarkerPopup} />)}
            {children}
        </Map>
    )
}

export default MapComponent