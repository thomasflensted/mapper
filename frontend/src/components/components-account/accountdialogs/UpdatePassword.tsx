import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import VisibilityIcon from '../../components-misc/VisibilityIcon';

const UpdatePassword = ({ setOpen }: { setOpen: Function }) => {

    const [newIsVisible, setNewIsVisible] = useState(false);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const resetVisibility = () => {
        setPasswordIsVisible(false);
        setNewIsVisible(false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(false);
        resetVisibility();
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content onInteractOutside={resetVisibility} onEscapeKeyDown={resetVisibility} className='fixed flex flex-col w-1/4 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded animate-fade-in top-1/3 left-1/2'>
                <Dialog.Title className='font-bold text-blue-600'>Update Password</Dialog.Title>
                <form id='pwform' onSubmit={(e) => handleSubmit(e)}>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>New Password</label>
                        <input className="text-input" type={passwordIsVisible ? 'text' : 'password'} />
                        <VisibilityIcon visible={passwordIsVisible} change={setPasswordIsVisible} />
                    </div>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Repeat New Password</label>
                        <input className="text-input" type={newIsVisible ? 'text' : 'password'} />
                        <VisibilityIcon visible={newIsVisible} change={setNewIsVisible} />
                    </div>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Old Password</label>
                        <input className="text-input" type={newIsVisible ? 'text' : 'password'} />
                        <VisibilityIcon visible={newIsVisible} change={setNewIsVisible} />
                    </div>
                </form>
                <div className='flex gap-2 mt-4'>
                    <Dialog.Close onClick={resetVisibility} className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='pwform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdatePassword