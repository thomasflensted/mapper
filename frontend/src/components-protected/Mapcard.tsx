import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import mapexample from '../assets/mapexample.png'
import MapCardDropdown from './MapCardDropdown';

const MapCard = () => {
    return (
        <div className="h-56 w-56 rounded-xl border shadow-md flex flex-col p-2 relative cursor-pointer">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <HamburgerMenuIcon className='text-white absolute top-4 right-4' />
                </DropdownMenu.Trigger>
                <MapCardDropdown />
            </DropdownMenu.Root>
            <img className='rounded-lg' src={mapexample} alt="" />
            <div className='text-center h-full flex flex-col justify-center'>
                <h1 className='text-blue-600 font-bold text-sm mb-1 '>My Favorite Restaurants</h1>
                <p className='text-blue-500 text-xs'>A description of my favorite restaurants around the world</p>
            </div>
        </div>
    )
}

export default MapCard