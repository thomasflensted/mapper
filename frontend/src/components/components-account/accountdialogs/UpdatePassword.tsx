import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import VisibilityIcon from '../../components-misc/VisibilityIcon';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useUpdateUser from '../../../hooks/useUpdateUser';
import { ErrorMssg } from '../../components-misc/ErrorAndSuccess';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdatePassword = ({ setOpen, setSuccess }: ComponentProps) => {

    // context and hooks
    const { user, authDispatch } = useAuthContext();
    const { updatePassword, updateError } = useUpdateUser();

    // state
    const [newIsVisible, setNewIsVisible] = useState(false);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

    const resetVisibility = () => {
        setPasswordIsVisible(false);
        setNewIsVisible(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = await updatePassword(user, oldPassword, newPassword, newPasswordRepeat);
        if (!updatedUser) return;
        authDispatch({ type: 'LOGIN', payload: updatedUser });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess("Account password was successfully updated");
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
                        <input className="text-input" type={newIsVisible ? 'text' : 'password'} onChange={(e) => setNewPassword(e.target.value)} />
                        <VisibilityIcon visible={newIsVisible} change={setNewIsVisible} />
                    </div>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Repeat New Password</label>
                        <input className="text-input" type={newIsVisible ? 'text' : 'password'} onChange={(e) => setNewPasswordRepeat(e.target.value)} />
                        <VisibilityIcon visible={newIsVisible} change={setNewIsVisible} />
                    </div>
                    <div className='relative mb-4'>
                        <label className='mr-1 text-xs text-gray-600'>Old Password</label>
                        <input className="text-input" type={passwordIsVisible ? 'text' : 'password'} onChange={(e) => setOldPassword(e.target.value)} />
                        <VisibilityIcon visible={passwordIsVisible} change={setPasswordIsVisible} />
                    </div>
                </form>
                <div className='flex gap-2 mt-4'>
                    <Dialog.Close onClick={resetVisibility} className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='pwform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>
                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdatePassword