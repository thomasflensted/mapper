import thomas from '/Users/thomasflensted/Documents/03 PROJECTS/mapper/frontend/src/assets/thomas.webp'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';
import UpdateName from './accountdialogs/UpdateName';
import UpdateEmail from './accountdialogs/UpdateEmail';
import UpdatePassword from './accountdialogs/UpdatePassword';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';


const Account = () => {

    const [nameIsOpen, setNameIsOpen] = useState(false);
    const [emailIsOpen, setEmailIsOpen] = useState(false);
    const [passwordIsOpen, setPasswordIsOpen] = useState(false);
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="flex px-12 flex-col border text-sm text-gray-500 gap-8 w-1/3 p-8 rounded-lg h-min shadow-[0_0_60px_0px_rgba(0,0,0,0.05)] animate-page-slide-up">

            <div className="relative m-auto overflow animate-scale-up">
                <img className='w-[90px] h-[90px] rounded-full shadow-lg' src={thomas} alt="Rounded avatar" />
                <div className='absolute bottom-[10px] right-[-4px] rounded-full shadow-md p-1 bg-white hover:scale-125 transition ease'>
                    <Pencil1Icon className='text-black' />
                </div>
            </div>

            <div className="flex justify-between">
                <div>
                    <h3 className="text-sm text-black">Name</h3>
                    <p className="text-sm text-gray-400">{`${user?.first_name} ${user?.last_name}`}</p>
                </div>
                <Dialog.Root open={nameIsOpen} onOpenChange={setNameIsOpen}>
                    <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                    <UpdateName setOpen={setNameIsOpen} />
                </Dialog.Root>
            </div>

            <div className="flex justify-between">
                <div>
                    <h3 className="text-sm text-black">Email</h3>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
                <Dialog.Root open={emailIsOpen} onOpenChange={setEmailIsOpen}>
                    <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                    <UpdateEmail setOpen={setEmailIsOpen} />
                </Dialog.Root>
            </div>

            <div className="flex justify-between">
                <div>
                    <h3 className="text-sm text-black">Password</h3>
                    <p className="text-sm text-gray-400">••••••••••••</p>
                </div>
                <Dialog.Root open={passwordIsOpen} onOpenChange={setPasswordIsOpen}>
                    <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                    <UpdatePassword setOpen={setPasswordIsOpen} />
                </Dialog.Root>
            </div>

            <div className='flex flex-col w-full gap-2'>
                <div className='flex gap-2'>
                    <Link className='w-full' to='/'>
                        <button className="w-full btn-blue">Go To Maps</button>
                    </Link>
                    <button className='w-full btn-red'>Delete Account</button>
                </div>
                <button onClick={handleLogout} className='w-full btn-red'>Log Out</button>
            </div>


        </div>
    )
}

export default Account