import * as Dialog from '@radix-ui/react-dialog';
import VisibilityIcon from '../../components-misc/VisibilityIcon';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useUpdateUser from '../../../hooks/useUpdateUser';
import { ErrorMssg } from '../../components-misc/ErrorAndSuccess';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdateEmail = ({ setOpen, setSuccess }: ComponentProps) => {

    const { user, authDispatch } = useAuthContext();
    const { updateEmail, updateError } = useUpdateUser();
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user?.email || '');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = await updateEmail(user, email, password);
        if (!updatedUser) return;
        authDispatch({ type: 'LOGIN', payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess("Account email was successfully updated");
        setOpen(false);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content
                className='fixed flex flex-col w-1/4 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded animate-fade-in top-1/3 left-1/2'>
                <Dialog.Title className='font-bold text-blue-600'>Update Email</Dialog.Title>
                <form id='emailform' onSubmit={(e) => handleSubmit(e)}>
                    <div className='mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Email</label>
                        <input className="text-input" type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="text-input" type={passwordIsVisible ? 'text' : 'password'} />
                        <VisibilityIcon visible={passwordIsVisible} change={setPasswordIsVisible} />
                    </div>
                </form>
                <div className='flex gap-2'>
                    <Dialog.Close className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='emailform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>
                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdateEmail