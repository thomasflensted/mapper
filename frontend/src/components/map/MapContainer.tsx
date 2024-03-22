// react imports
import { useState, useMemo } from 'react';
import { usePlaces } from '../../hooks/place-hooks/usePlaces';
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';

// components
import MapComponent from './MapComponent';
import MapControllers from './controllers/MapControllers';
import MarkerComponent from './markers-and-popups/MarkerComponent';
import PopUps from './markers-and-popups/PopUps';
import AdjustButtons from './controllers/AdjustButtons';

// types and data
import { Place, PlaceType, Places } from '../../types/placeTypes';
import { useMapStateContext } from '../../hooks/map-state/useMapStateContext';
import { MapStateActionType } from '../../types/mapStateActions';
import { usePlaceContext } from '../../hooks/place-hooks/usePlaceContext';
import { PlaceActionType } from '../../types/placeActions';


const MapContainer = ({ places, map_id }: { places: Places, map_id: string }) => {

    const { user } = useAuthContext();
    const { updatePlace } = usePlaces();
    const { placeDispatch } = usePlaceContext();
    const { currentPlace, isAdjustingMarker, showPopup, mapStateDispatch } = useMapStateContext()
    const [clickCoordinates, setClickCoordinates] = useState({ lng: 0, lat: 0 });
    const [updatedPosition, setUpdatedPosition] = useState({ lng: 0, lat: 0 })
    const [filter, setFilter] = useState<PlaceType[]>([]);
    const filteredPlaces: Places = filter.length === 0 ? places : places.filter((place) => filter.includes(place.type));

    const handleMarkerClick = (e: mapboxgl.MapLayerMouseEvent, place: Place) => {
        e.originalEvent.stopPropagation();
        mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: place });
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: true });
    }

    const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
        if (isAdjustingMarker) return;
        mapStateDispatch({ type: MapStateActionType.SET_PLACE, payload: null });
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: showPopup ? false : true });
        setClickCoordinates(e.lngLat);
    }

    const handleAdjustMarkerLocation = async (cancelled: boolean) => {
        if (!cancelled && currentPlace) {
            placeDispatch({
                type: PlaceActionType.UPDATE_PLACE,
                payload: { id: currentPlace._id, updatedProps: { coordinates: [updatedPosition.lng, updatedPosition.lat] } }
            })
            await updatePlace(user, currentPlace._id, { coordinates: [updatedPosition.lng, updatedPosition.lat] });
        }
        mapStateDispatch({ type: MapStateActionType.SET_POPUP, payload: false });
        mapStateDispatch({ type: MapStateActionType.SET_ADJUSTING, payload: false });
    }

    const Markers = useMemo(() => filteredPlaces.map(place => (
        <MarkerComponent
            key={place._id}
            place={place}
            setUpdatedPosition={setUpdatedPosition}
            handleClick={handleMarkerClick} />
    )), [filteredPlaces])

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative" >
            <MapComponent handleMapClick={handleMapClick}>

                {!isAdjustingMarker &&
                    <MapControllers
                        setFilter={setFilter}
                        filteredPlaces={filteredPlaces} />}

                {showPopup && !isAdjustingMarker &&
                    <PopUps
                        setUpdatedPosition={setUpdatedPosition}
                        map_id={map_id}
                        coords={clickCoordinates}
                    />}

                {isAdjustingMarker &&
                    <AdjustButtons handleAdjust={handleAdjustMarkerLocation} />} // buttons to finish / cancel here

                {Markers}

            </MapComponent>
        </div>
    )
}

export default MapContainer