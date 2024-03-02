import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import DeleteWarning from './DeleteWarning';

const MapCardDropdown = () => {
    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={5} className='bg-white shadow-lg p-2 rounded'>
                <DropdownMenu.Item className='cursor-pointer text-sm font-medium text-blue-500 hover:outline-none focus:outline-none rounded hover:bg-gray-100 focus:bg-gray-100 px-2 py-1'>Edit Map Details</DropdownMenu.Item>
                <DropdownMenu.Separator className='h-[.5px] bg-blue-500 my-2' />
                <AlertDialog.Root>
                    <DeleteWarning />
                    <AlertDialog.Trigger className='cursor-pointer text-sm font-medium text-red-500 hover:outline-none focus:outline-none rounded hover:bg-red-50 focus:bg-red-50 px-2 py-1 w-full text-left'>
                        Delete Map
                    </AlertDialog.Trigger>
                </AlertDialog.Root>
                <DropdownMenu.Arrow className='fill-white' />
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    )
}

export default MapCardDropdown