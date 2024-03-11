import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const UpdateName = ({ setOpen }: { setOpen: Function }) => {

    const { user } = useAuthContext();
    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastname] = useState(user?.last_name)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(firstName, lastName);
        setOpen(false);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content
                className='fixed flex flex-col w-1/4 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded animate-fade-in top-1/3 left-1/2'>
                <Dialog.Title className='font-bold text-blue-600'>Update Name</Dialog.Title>
                <form id='nameform' onSubmit={(e) => handleSubmit(e)}>

                    <div className='mb-4'>
                        <label className='text-xs text-gray-600'>First Name</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-input" type='text' />
                    </div>

                    <div className='mb-4'>
                        <label className='text-xs text-gray-600'>Last Name</label>
                        <span className='text-xs italic text-gray-300'> - optional</span>
                        <input value={lastName} onChange={(e) => setLastname(e.target.value)} className="text-input" type='text' />
                    </div>

                </form>

                <div className='flex gap-2'>
                    <Dialog.Close className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='nameform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>

            </Dialog.Content>
        </Dialog.Portal >
    )
}

export default UpdateName