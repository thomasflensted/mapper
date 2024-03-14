import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import DeleteWarning from '../misc/DeleteWarning';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import useUpdateUser from '../../hooks/user-hooks/useUpdateUser';

const DeleteDropDown = ({ setError }: { setError: React.Dispatch<React.SetStateAction<string>> }) => {

    const { deleteUser } = useUpdateUser();
    const deleteText = "This action cannot be undone. Your user, including all of your maps and places will be deleted.";

    const handleDeleteUser = async () => {
        const result = await deleteUser();
        if (!result.success) setError(result.mssg);
    }

    return (
        <div className='absolute right-6 top-6'>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <HamburgerMenuIcon />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content sideOffset={3} className='p-1 bg-white border rounded-md shadow-md'>
                        <AlertDialog.Root>
                            <DeleteWarning text={deleteText} btnText="Delete My Account" deleteFunction={handleDeleteUser} />
                            <AlertDialog.Trigger className='w-full px-3 py-1 text-sm font-medium text-left text-red-500 rounded cursor-pointer hover:outline-none focus:outline-none hover:bg-red-50 focus:bg-red-50'>
                                Delete Account
                            </AlertDialog.Trigger>
                        </AlertDialog.Root>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}

export default DeleteDropDown