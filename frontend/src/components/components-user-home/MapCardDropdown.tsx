import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import DeleteWarning from '../components-misc/DeleteWarning';
import { Link } from 'react-router-dom';
import { useMaps } from '../../hooks/map-hooks/useMaps';
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext';

type DropDownProps = {
    mapData: { name: string, description: string, id: string }
}

const MapCardDropdown = ({ mapData }: DropDownProps) => {

    const { deleteMap, duplicateMap } = useMaps();
    const { user } = useAuthContext();

    const handleDuplicateMap = async () => await duplicateMap(user, { name: mapData.name, description: mapData.description });
    const handleDeleteMap = async () => await deleteMap(user, mapData.id);

    const deleteText = "The map and all its associated places will be deleted. This action cannot be undone.";

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={5} className='p-2 bg-white rounded-lg shadow-lg'>
                <Link to='/editmap' state={mapData}>
                    <DropdownMenu.Item className='px-2 py-1 text-sm font-medium text-blue-500 rounded cursor-pointer hover:outline-none focus:outline-none hover:bg-gray-100 focus:bg-gray-100'>Edit Map Details</DropdownMenu.Item>
                </Link>
                <DropdownMenu.Separator className='h-[.5px] bg-blue-500 my-2' />
                <DropdownMenu.Item
                    onClick={handleDuplicateMap}
                    className='px-2 py-1 text-sm font-medium text-blue-500 rounded cursor-pointer hover:outline-none focus:outline-none hover:bg-gray-100 focus:bg-gray-100'>Duplicate Map</DropdownMenu.Item>
                <DropdownMenu.Separator className='h-[.5px] bg-blue-500 my-2' />
                <AlertDialog.Root>
                    <DeleteWarning text={deleteText} btnText='Delete Map' deleteFunction={handleDeleteMap} />
                    <AlertDialog.Trigger className='w-full px-2 py-1 text-sm font-medium text-left text-red-500 rounded cursor-pointer hover:outline-none focus:outline-none hover:bg-red-50 focus:bg-red-50'>
                        Delete Map
                    </AlertDialog.Trigger>
                </AlertDialog.Root>
                <DropdownMenu.Arrow className='fill-white' />
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    )
}

export default MapCardDropdown