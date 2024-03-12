import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { ErrorMssg } from '../../components-misc/ErrorAndSuccess';
import useUpdateUser from '../../../hooks/useUpdateUser';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdateName = ({ setOpen, setSuccess }: ComponentProps) => {

    // context and hooks
    const { user, authDispatch } = useAuthContext();
    const { updateUserName, updateError } = useUpdateUser();

    // state
    const [firstName, setFirstName] = useState<string>(user?.first_name || '');
    const [lastName, setLastname] = useState<string>(user?.last_name || '')
    const [error, setError] = useState('')

    // update names
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = await updateUserName(user, firstName, lastName);
        if (!updatedUser) return;
        authDispatch({ type: 'LOGIN', payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess("Account name was successfully updated");
        setOpen(false);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content onInteractOutside={() => setError('')}
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
                    <Dialog.Close onClick={() => setError('')} className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='nameform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>
                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal >
    )
}

export default UpdateName