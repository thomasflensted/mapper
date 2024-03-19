// components
import * as Dialog from '@radix-ui/react-dialog';
import { ErrorMssg } from '../../global-misc-general/ErrorAndSuccess';

// hooks and others
import { FormEvent, useState } from 'react';
import useUpdateUser from '../../../hooks/user-hooks/useUpdateUser';
import { DialogButtons, PasswordInput } from '../../global-misc-general/FormComponents';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdatePassword = ({ setOpen, setSuccess }: ComponentProps) => {

    // context and hooks
    const { updatePassword, updateError, setUpdateError } = useUpdateUser();

    // state
    const [newIsVisible, setNewIsVisible] = useState(false);
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

    const reset = () => {
        setPasswordIsVisible(false);
        setNewIsVisible(false);
        setUpdateError('')
        setOpen(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await updatePassword(oldPassword, newPassword, newPasswordRepeat);
        if (result) {
            setSuccess(result);
            reset();
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content onInteractOutside={reset} onEscapeKeyDown={reset} className='fixed flex flex-col w-1/4 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded animate-fade-in top-1/3 left-1/2'>
                <Dialog.Title className='font-bold text-blue-600'>Update Password</Dialog.Title>

                <form id='pwform' onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>

                    <PasswordInput heading='New Password' setText={setNewPassword} isVisible={newIsVisible} setVisibility={setNewIsVisible} />
                    <PasswordInput heading='Repeat New Password' setText={setNewPasswordRepeat} isVisible={newIsVisible} setVisibility={setNewIsVisible} />
                    <PasswordInput heading='Old Password' setText={setOldPassword} isVisible={passwordIsVisible} setVisibility={setPasswordIsVisible} />
                    <DialogButtons resetFunction={reset} />

                </form>

                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdatePassword