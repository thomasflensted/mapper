// hooks, context and react
import { ReactNode, useState, useRef, useEffect, useMemo } from "react";
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';
import { useMapStateContext } from '../../hooks/map-state/useMapStateContext';
import { usePlaces } from "../../hooks/place-hooks/usePlaces";

// components
import MarkerComponent from "./markers-and-popups/MarkerComponent";
import PopUpWithSignUpButton from "./markers-and-popups/PopUpWithSignUpButton";
import PopUpWithInfo from "./markers-and-popups/PopUpWithInfo";
import PopUpWithAddNewButton from './markers-and-popups/PopUpWithAddNewButton';
import GeoCoder from "./GeoCoder";

// react map gl / mapbox
import Map, { GeolocateControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const STYLE = import.meta.env.VITE_MAP_STYLE;

// types
import { Place, Places } from "../../types/placeTypes";
import { MapStateActionType } from '../../types/mapStateActions';
import AdjustButtons from "./AdjustButtons";

type MapComponentProps = {
    children: ReactNode,
    filteredPlaces: Places,
    map_id: string,
}

const MapComponent = ({ children, filteredPlaces, map_id }: MapComponentProps) => {

    const mapRef = useRef<any>();
    const { user } = useAuthContext();
    const { currentPlace, view, isAdjustingMarker, mapStateDispatch } = useMapStateContext();
    const { updatePlace } = usePlaces();
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showMarkerPopup, setShowMarkerPopup] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 })
    const [updatedCoords, setUpdatedCoords] = useState<{ lng: number, lat: number }>({ lng: 0, lat: 0 });

    // fly to place if outside of visible map
    useEffect(() => {
        if (currentPlace && !mapRef.current.getBounds().contains(currentPlace.coordinates)) {
            mapRef.current.flyTo({ center: [currentPlace?.coordinates[0], currentPlace?.coordinates[1]] })
        }
    }, [currentPlace])

    // if new filter is added and selected place is not included, set place to null
    useEffect(() => {
        if (!filteredPlaces.find(place => place._id === currentPlace?._id)) {
            setShowMarkerPopup(false);
            mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: null })
        }
    }, [filteredPlaces])

    const handleUpdateMarkerPosition = async (cancelled: boolean) => {
        if (!currentPlace) return;
        setShowMarkerPopup(false);
        if (!cancelled) await updatePlace(user, currentPlace?._id, { coordinates: [updatedCoords.lng, updatedCoords.lat] });
        mapStateDispatch({ type: MapStateActionType.SET_IS_ADJUSTING_MARKER, payload: false });
    }

    const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
        if (isAdjustingMarker) return;
        mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: null })
        setClickCoordinates(e.lngLat)
        setShowMapPopup(showMapPopup || currentPlace ? false : true);
    }

    const handleMarkerClick = (e: mapboxgl.MapLayerMouseEvent, place: Place) => {
        setShowMapPopup(false);
        if (isAdjustingMarker) return;
        e.originalEvent.stopImmediatePropagation();
        mapStateDispatch({ type: MapStateActionType.SET_CURRENT_PLACE, payload: place })
        setShowMarkerPopup(true)
    }

    const Markers = useMemo(() => filteredPlaces.map(place => (
        <MarkerComponent
            key={place._id}
            place={place}
            setUpdatedCoords={setUpdatedCoords}
            handleClick={handleMarkerClick} />
    )), [filteredPlaces])

    return (
        <Map
            reuseMaps={true}
            ref={mapRef}
            onClick={(e) => handleMapClick(e)}
            mapboxAccessToken={TOKEN}
            mapStyle={STYLE}
            initialViewState={{ longitude: 15, latitude: 20, zoom: 1.5 }}
            attributionControl={false}>

            {/* search bar */}
            {!isAdjustingMarker && <GeoCoder />}

            {/* control to get users location */}
            {!isAdjustingMarker && <GeolocateControl position='bottom-right' />}

            {/* markers, memoized above to avoid unnecessary rendering */}
            {Markers}

            {/* Pop up with button to add new place on clicked location */}
            {showMapPopup && user && (
                <PopUpWithAddNewButton
                    map_id={map_id}
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}

            {/* popup with info about current place */}
            {showMarkerPopup && currentPlace && view == 'marker' && !isAdjustingMarker && (
                <PopUpWithInfo
                    place={currentPlace}
                    setShowPopUp={setShowMarkerPopup} />)}

            {/* children, all ui is cleared while user repositions marker */}
            {!isAdjustingMarker && children}

            {/* UI that shows when user repositions marker */}
            {isAdjustingMarker &&
                <AdjustButtons handleUpdateMarkerPosition={handleUpdateMarkerPosition} />}


            {/* popup that only shows if user is not logged in */}
            {showMapPopup && !user && (
                <PopUpWithSignUpButton
                    lat={clickCoordinates.lat}
                    lng={clickCoordinates.lng}
                    setShowPopUp={setShowMapPopup} />)}

        </Map >
    )
}

export default MapComponent