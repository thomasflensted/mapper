import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { chooseRandomImage } from '../user-front-page/Mapcard';

const MapCardMock = ({ title, desc }: { title: string, desc: string }) => {

    const image = chooseRandomImage();

    return (
        <div
            className="relative flex flex-col w-56 h-56 p-2 transition border shadow-md cursor-pointer rounded-xl hover:scale-[1.025] ease" >
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <HamburgerMenuIcon className='absolute text-white top-4 right-4' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content sideOffset={5} className='p-2 bg-white rounded-lg shadow-lg'>
                        <Link to='/signup'>
                            <DropdownMenu.Item className='px-2 py-1 text-sm font-medium text-blue-500 rounded cursor-pointer hover:outline-none focus:outline-none hover:bg-gray-100 focus:bg-gray-100'>Sign Up To Get Started</DropdownMenu.Item>
                        </Link>
                        <DropdownMenu.Arrow className='fill-white' />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <img className='rounded-lg' src={image} alt="" />
            <div className='flex flex-col justify-center h-full px-2 overflow-hidden text-center text-ellipsis '>
                <h1 className='my-1 text-sm font-semibold text-blue-600 whitespace-nowrap'>{title}</h1>
                <p className='px-4 text-xs text-blue-500'>{desc}</p>
            </div>
        </div>
    )
}

export default MapCardMock