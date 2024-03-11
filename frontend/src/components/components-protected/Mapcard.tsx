import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import mapexample from '/Users/thomasflensted/Documents/03 PROJECTS/mapper/frontend/src/assets/mapexample.png'
import MapCardDropdown from './MapCardDropdown';
import { motion } from "framer-motion"

export type Variants = {
    before: { opacity: number, y: number, scale: number },
    after: { opacity: number, y: number, scale: number }
};

const MapCard = ({ variants }: { variants: Variants }) => {

    return (
        <motion.div
            variants={variants}
            className="relative flex flex-col w-56 h-56 p-2 border shadow-md cursor-pointer rounded-xl">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <HamburgerMenuIcon className='absolute text-white top-4 right-4' />
                </DropdownMenu.Trigger>
                <MapCardDropdown />
            </DropdownMenu.Root>
            <img className='rounded-lg' src={mapexample} alt="" />
            <div className='flex flex-col justify-center h-full text-center'>
                <h1 className='mb-1 text-sm font-bold text-blue-600 '>My Favorite Restaurants</h1>
                <p className='text-xs text-blue-500'>A description of my favorite restaurants around the world</p>
            </div>
        </motion.div>
    )
}

export default MapCard

// 