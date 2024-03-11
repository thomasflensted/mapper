import { Marker } from 'react-map-gl';
import { Place } from '../../types';
import { FaHamburger, FaCoffee, FaTree, FaBuilding, FaStar, FaLightbulb } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { ReactNode } from 'react';

type PlaceIcon = { element: ReactNode, border: string }
type PlaceIcons = { [key: string]: PlaceIcon }
type MarkerProps = {
    place: Place,
    handleClick: (e: any, coords: number[], name: string, desc: string, type: string) => void
}

const MarkerComponent = ({ place, handleClick }: MarkerProps) => {

    const placeIcons: PlaceIcons = {
        restaurant: { element: <FaHamburger className='w-3 h-3 text-orange-400' />, border: 'border-orange-400' },
        cafe: { element: <FaCoffee className='w-3 h-3 text-yellow-900' />, border: 'border-yellow-900' },
        nature: { element: <FaTree className='w-3 h-3 text-green-600' />, border: 'border-green-600' },
        hotel: { element: <FaBuilding className='w-3 h-3 text-teal-500' />, border: 'border-teal-500' },
        sight: { element: <FaStar className='w-3 h-3 text-blue-500' />, border: 'border-blue-500' },
        museum: { element: <GiGreekTemple className='w-3 h-3 text-red-600' />, border: 'border-red-600' },
        memory: { element: <FaLightbulb className='w-3 h-3 text-slate-600' />, border: 'border-slate-600' },
    }

    return (
        <Marker
            onClick={(e) => handleClick(e, place.coordinates, place.name, place.description, place.type)}
            key={place.coordinates[0]}
            longitude={place.coordinates[0]}
            latitude={place.coordinates[1]}>
            <div className={`flex items-center justify-center w-6 h-6 bg-white border
                rounded-full shadow-md hover:cursor-pointer ${placeIcons[place.type].border}`}>
                {placeIcons[place.type].element}
            </div>
        </Marker>
    )
}

export default MarkerComponent