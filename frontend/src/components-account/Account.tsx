import thomas from '../assets/thomas.webp'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';
import UpdateName from './accountdialogs/UpdateName';
import UpdateEmail from './accountdialogs/UpdateEmail';
import UpdatePassword from './accountdialogs/UpdatePassword';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

const Account = () => {

    const [nameIsOpen, setNameIsOpen] = useState(false);
    const [emailIsOpen, setEmailIsOpen] = useState(false);
    const [passwordIsOpen, setPasswordIsOpen] = useState(false);

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
                    <p className="text-sm text-gray-400">Thomas Flensted</p>
                </div>
                <Dialog.Root open={nameIsOpen} onOpenChange={setNameIsOpen}>
                    <Dialog.Trigger className="px-6 py-2 transition border rounded hover:bg-slate-50 hover:scale-105 ease">Edit</Dialog.Trigger>
                    <UpdateName setOpen={setNameIsOpen} />
                </Dialog.Root>
            </div>

            <div className="flex justify-between">
                <div>
                    <h3 className="text-sm text-black">Email</h3>
                    <p className="text-sm text-gray-400">thomasflenstedjensen@gmail.com</p>
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

            <Link to='/'>
                <button className="w-full py-3 font-bold text-white bg-blue-500 border rounded hover:bg-blue-600">Close</button>
            </Link>
        </div>
    )
}

export default Account

// <h1 className="text-lg font-bold">Account Details</h1>