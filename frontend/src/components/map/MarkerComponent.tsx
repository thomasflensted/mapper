import { Marker } from 'react-map-gl';
import { Place } from '../../types/placeTypes';
import { FaHamburger, FaCoffee, FaTree, FaBuilding, FaStar, FaLightbulb } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { ReactNode } from 'react';

type PlaceIcons = { [key: string]: ReactNode }
type PlaceBorders = { [key: string]: string }
type MarkerProps = {
    place: Place,
    handleClick: (e: any, place: Place) => void,
    size: string
}

const MarkerComponent = ({ place, handleClick, size }: MarkerProps) => {

    const placeBorders: PlaceBorders = {
        restaurant: 'border-orange-400',
        cafe: 'border-yellow-900',
        nature: 'border-green-600',
        hotel: 'border-teal-500',
        sight: 'border-blue-400',
        museum: 'border-red-600',
        memory: 'border-slate-600'
    }

    const placeIcons: PlaceIcons = {
        restaurant: <FaHamburger className='w-3 h-3 text-orange-400' />,
        cafe: <FaCoffee className='w-3 h-3 text-yellow-900' />,
        nature: <FaTree className='w-3 h-3 text-green-600' />,
        hotel: <FaBuilding className='w-3 h-3 text-teal-500' />,
        sight: <FaStar className='w-3 h-3 text-blue-500' />,
        museum: <GiGreekTemple className='w-3 h-3 text-red-600' />,
        memory: <FaLightbulb className='w-3 h-3 text-slate-600' />,
    }

    return (
        <Marker
            draggable={true}
            onClick={(e) => handleClick(e, place)}
            key={place.coordinates[0]}
            longitude={place.coordinates[0]}
            latitude={place.coordinates[1]} >
            <div className={`flex items-center justify-center w-6 h-6 bg-white border
                rounded-full shadow-md hover:cursor-pointer ${placeBorders[place.type]} ${size}`}>
                {placeIcons[place.type]}
            </div>
        </Marker >
    )
}

export default MarkerComponent