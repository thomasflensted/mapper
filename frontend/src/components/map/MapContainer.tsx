// react imports
import { useState } from 'react';

// components
import FiltersExpander from './FiltersExpander';
import MapComponent from './MapComponent';
import MapList from './MapList';
import ViewToggler from './ViewToggler';

// types and data
import { PlaceType, Places } from '../../types/placeTypes';
import { MapStateContextProvider } from '../../contexts/MapStateContext';

const MapContainer = ({ places, map_id }: { places: Places, map_id: string }) => {

    const [filter, setFilter] = useState<PlaceType[]>([])
    const filteredPlaces: Places = filter.length === 0
        ? places
        : places.filter((place) => filter.includes(place.type));

    return (
        <MapStateContextProvider>
            <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative" >
                <MapComponent map_id={map_id} filteredPlaces={filteredPlaces}>
                    <FiltersExpander setFilter={setFilter} />
                    <ViewToggler />
                    <MapList filteredPlaces={filteredPlaces} />
                </MapComponent>
            </div>
        </MapStateContextProvider>
    )
}

export default MapContainer