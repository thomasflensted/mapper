// react imports
import { useState } from 'react';

// components
import FiltersExpander from './FiltersExpander';
import MapComponent from './MapComponent';
import MapList from './MapList';
import ViewToggler from './ViewToggler';

// types and data
import { PlaceType, Places, Place } from '../../types/placeTypes';
import { View } from '../../types/mapTypes';

const MapContainer = ({ places, map_id }: { places: Places, map_id: string }) => {

    const [filter, setFilter] = useState<PlaceType[]>([])
    const [view, setView] = useState<View>('marker');
    const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
    const filteredPlaces: Places = filter.length === 0
        ? places
        : places.filter((place) => filter.includes(place.type));

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative" >
            <MapComponent
                map_id={map_id}
                filteredPlaces={filteredPlaces}
                currentPlace={currentPlace}
                setCurrentPlace={setCurrentPlace}
                view={view}>
                <FiltersExpander setFilter={setFilter} />
                <ViewToggler view={view} setView={setView} />
                <MapList filteredPlaces={filteredPlaces} currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} view={view} />
            </MapComponent>
        </div >
    )
}

export default MapContainer