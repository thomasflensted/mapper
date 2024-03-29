import { Marker } from 'react-map-gl';
import { Place } from '../../../types/placeTypes';
import { FaHamburger, FaCoffee, FaTree, FaBuilding, FaStar, FaLightbulb } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { ReactNode, useEffect, useState } from 'react';
import { useMapStateContext } from '../../../hooks/map-state/useMapStateContext';

type PlaceIcons = { [key: string]: ReactNode }
type PlaceBorders = { [key: string]: string }
type MarkerProps = {
    place: Place,
    handleClick: (e: any, place: Place) => void,
    setUpdatedPosition: React.Dispatch<React.SetStateAction<{ lng: number; lat: number; }>>
}

const MarkerComponent = ({ place, handleClick, setUpdatedPosition }: MarkerProps) => {

    const [markerCoords, setMarkerCoords] = useState<{ lng: number, lat: number }>({ lng: place.coordinates[0], lat: place.coordinates[1] });
    const { currentPlace, isAdjustingMarker, view } = useMapStateContext();

    useEffect(() => {
        setMarkerCoords({ lng: place.coordinates[0], lat: place.coordinates[1] })
    }, [isAdjustingMarker])

    const handleDragEnd = (e: any) => {
        setMarkerCoords({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        setUpdatedPosition({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    }

    const placeBorders: PlaceBorders = {
        restaurant: 'border-orange-400',
        cafe: 'border-yellow-900',
        nature: 'border-green-600',
        hotel: 'border-teal-500',
        sight: 'border-blue-400',
        museum: 'border-red-600',
        memory: 'border-slate-600',
        other: 'border-sky-500'
    }

    const placeIcons: PlaceIcons = {
        restaurant: <FaHamburger className='w-3 h-3 text-orange-400' />,
        cafe: <FaCoffee className='w-3 h-3 text-yellow-900' />,
        nature: <FaTree className='w-3 h-3 text-green-600' />,
        hotel: <FaBuilding className='w-3 h-3 text-teal-500' />,
        sight: <FaStar className='w-3 h-3 text-blue-500' />,
        museum: <GiGreekTemple className='w-3 h-3 text-red-600' />,
        memory: <FaLightbulb className='w-3 h-3 text-slate-600' />,
        other: <HiDotsCircleHorizontal className='w-3 h-3 text-sky-500' />
    }

    return (
        <Marker
            draggable={isAdjustingMarker && currentPlace?._id === place._id}
            onDragEnd={(e) => handleDragEnd(e)}
            onClick={(e) => handleClick(e, place)}
            key={place.coordinates[0]}
            longitude={markerCoords.lng}
            latitude={markerCoords.lat}>
            <div
                className={`flex items-center justify-center w-6 h-6 bg-white 
                border rounded-full shadow-md hover:cursor-pointer ${currentPlace?._id === place._id && view === 'list' ? 'scale-125' : ''} 
                ${placeBorders[place.type]} ${isAdjustingMarker && currentPlace?._id !== place._id ? 'hidden' : ''}`}>
                {placeIcons[place.type]}
            </div>
        </Marker >
    )
}

export default MarkerComponent