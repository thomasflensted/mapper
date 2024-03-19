import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import images from '../../assets/index'
import MapCardDropdown from './MapCardDropdown';
import { motion } from "framer-motion"

export type Variants = {
    before: { opacity: number, y: number, scale: number },
    after: { opacity: number, y: number, scale: number }
};

type MapCardProps = {
    variants: Variants,
    name: string,
    description: string,
    id: string
}

export const chooseRandomImage = () => {
    return images[Math.floor(Math.random() * (images.length))];
}

const MapCard = ({ variants, name, description, id }: MapCardProps) => {

    const mapData = { name, description, id };
    const image = chooseRandomImage();

    return (
        <motion.div
            variants={variants}
            className="relative flex flex-col w-56 h-56 p-2 border shadow-md cursor-pointer rounded-xl">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <HamburgerMenuIcon className='absolute text-white top-4 right-4' />
                </DropdownMenu.Trigger>
                <MapCardDropdown mapData={mapData} />
            </DropdownMenu.Root>
            <img className='rounded-lg' src={image} alt="" />
            <div className='flex flex-col justify-center h-full text-center'>
                <h1 className='mb-1 text-sm font-bold text-blue-600 '>{name}</h1>
                <p className='px-4 text-xs text-blue-500'>{description}</p>
            </div>
        </motion.div>
    )
}

export default MapCard