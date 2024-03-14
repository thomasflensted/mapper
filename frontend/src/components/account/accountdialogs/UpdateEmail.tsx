import * as Dialog from '@radix-ui/react-dialog';
import VisibilityIcon from '../../misc/VisibilityIcon';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/user-hooks/useAuthContext';
import useUpdateUser from '../../../hooks/user-hooks/useUpdateUser';
import { ErrorMssg } from '../../misc/ErrorAndSuccess';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdateEmail = ({ setOpen, setSuccess }: ComponentProps) => {

    const { user } = useAuthContext();
    const { updateEmail, updateError, setUpdateError } = useUpdateUser();
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user?.email || '');

    const reset = (success: boolean) => {
        setOpen(false);
        setPasswordIsVisible(false);
        setUpdateError('')
        success ? setEmail(email) : setEmail(user?.email || '');
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await updateEmail(email, password);
        if (result) {
            setSuccess(result);
            reset(true);
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content
                onInteractOutside={() => reset(false)}
                onEscapeKeyDown={() => reset(false)}
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
                    <Dialog.Close onClick={() => reset(false)} className='w-full py-2 border rounded hover:bg-gray-50'>Cancel</Dialog.Close>
                    <button form='emailform' className='w-full py-2 text-white bg-blue-500 border rounded hover:bg-blue-600'>Update</button>
                </div>
                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdateEmail