import { Map } from 'react-map-gl';
import { ReactNode, useState, useRef, useEffect, useMemo } from "react";
import { Place, Places } from "../../types/placeTypes";
import mapboxgl from 'mapbox-gl';
import MarkerComponent from "./MarkerComponent";
import PopUpWithSignUpButton from "./popups/PopUpWithSignUpButton";
import PopUpWithInfo from "./popups/PopUpWithInfo";
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';
import PopUpWithAddNewButton from './popups/PopUpWithAddNewButton';
import { MapStateActionType } from '../../types/mapStateActions';
import { useMapStateContext } from '../../hooks/map-state/useMapStateContext';
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type MapView = { longitude: number, latitude: number, zoom: number };

type MapComponentProps = {
    children: ReactNode,
    filteredPlaces: Places,
    map_id: string,
}

const MapComponent = ({ children, filteredPlaces, map_id }: MapComponentProps) => {

    const mapRef = useRef<any>(null);
    const { user } = useAuthContext();
    const { currentPlace, view, isAdjustingMarker, mapStateDispatch } = useMapStateContext();

    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showMarkerPopup, setShowMarkerPopup] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 })
    const [currentPlaceIsVisible, setCurrentPlaceIsVisible] = useState<boolean>(true);

    useEffect(() => {
        if (isAdjustingMarker) { setShowMarkerPopup(false) } else { setShowMarkerPopup(true) }
        if (currentPlace) setCurrentPlaceIsVisible(filteredPlaces.includes(currentPlace));
        if (view === 'list' && currentPlaceIsVisible && currentPlace) mapRef.current.flyTo({
            center: [currentPlace.coordinates[0], currentPlace.coordinates[1]]
        })
    }, [currentPlace, filteredPlaces, isAdjustingMarker])

    const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
        if (!isAdjustingMarker) {
            mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: null })
            setClickCoordinates(e.lngLat)
            setShowMarkerPopup(false)
            setShowMapPopup(showMapPopup ? false : true);
        }
    }

    const handleMarkerClick = (e: any, place: Place) => {
        e.originalEvent.stopImmediatePropagation();
        mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: place })
        setShowMapPopup(false);
        setShowMarkerPopup(true)
    }

    const Markers = useMemo(() => filteredPlaces.map(place => (
        <MarkerComponent
            key={place._id}
            place={place}
            handleClick={handleMarkerClick}
            size={(currentPlace?.name === place.name && view === 'list') ? 'scale-125' : 'scale-100'} />
    )), [filteredPlaces])

    const initialView: MapView = { longitude: 15, latitude: 20, zoom: 1.5 }
    return (
        <Map
            ref={mapRef}
            onZoom={() => setShowMapPopup(false)}
            onClick={(e) => handleMapClick(e)}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/thomasflensted/clltb8sq500aq01qx45ve35k7"
            initialViewState={initialView}>

            {Markers}

            {showMapPopup && !user && (
                <PopUpWithSignUpButton
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}

            {showMapPopup && user && !isAdjustingMarker && (
                <PopUpWithAddNewButton
                    map_id={map_id}
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}

            {showMarkerPopup && currentPlace && view == 'marker' && currentPlaceIsVisible && !isAdjustingMarker && (
                <PopUpWithInfo
                    place={currentPlace}
                    setShowPopUp={setShowMarkerPopup} />)}

            {!isAdjustingMarker && children}

            {isAdjustingMarker &&
                <button onClick={() => mapStateDispatch({ type: MapStateActionType.SET_IS_ADJUSTING_MARKER, payload: false })}
                    className='absolute px-4 font-bold border-none top-4 left-4 btn-blue'>Save Location</button>}

        </Map >
    )
}

export default MapComponent