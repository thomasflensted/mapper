import { useState } from 'react';
import FiltersExpander from './FiltersExpander';
import MapComponent from './MapComponent';
import { places } from '../../exampleData';
import { PlaceType, Places } from '../../types';
import MapList from './MapList';

const MapContainer = () => {

    const [filter, setFilter] = useState<PlaceType[]>([])
    const [selectedPlace, setSelectedPlace] = useState<string>('')
    const filteredPlaces: Places = filter.length === 0 ? places : places.filter(place => filter.includes(place.type));

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative">
            <MapList places={filteredPlaces} clickedPlace={selectedPlace} />
            <FiltersExpander setFilter={setFilter} />
            <MapComponent places={filteredPlaces} setPlace={setSelectedPlace} />
        </div>
    )
}

export default MapContainer