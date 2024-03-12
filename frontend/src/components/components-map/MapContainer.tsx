// react imports
import { useState } from 'react';

// components
import FiltersExpander from './FiltersExpander';
import MapComponent from './MapComponent';
import MapList from './MapList';
import ViewToggler from './ViewToggler';

// types and data
import { places } from '../../exampleData';
import { PlaceType, Places, View, Place } from '../../types';

const MapContainer = () => {

    const [filter, setFilter] = useState<PlaceType[]>([])
    const [view, setView] = useState<View>('marker');
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
    const filteredPlaces: Places = filter.length === 0 ? places : places.filter(place => filter.includes(place.type));

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative" >
            <MapComponent places={filteredPlaces} setCurrentPlace={setSelectedPlace} currentPlace={selectedPlace} view={view}>
                <FiltersExpander setFilter={setFilter} />
                <ViewToggler view={view} setView={setView} />
                <MapList places={filteredPlaces} currentPlace={selectedPlace} setCurrentPlace={setSelectedPlace} view={view} />
            </MapComponent>
        </div >
    )
}

export default MapContainer