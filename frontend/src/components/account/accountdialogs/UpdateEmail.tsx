import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/user-hooks/useAuthContext';
import useUpdateUser from '../../../hooks/user-hooks/useUpdateUser';
import { ErrorMssg } from '../../global-misc-general/ErrorAndSuccess';
import { DialogButtons, LabelAndInput, PasswordInput } from '../../global-misc-general/FormComponents';

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

    const reset = () => {
        setOpen(false);
        setPasswordIsVisible(false);
        setUpdateError('');
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await updateEmail(email, password);
        if (result) {
            setSuccess(result);
            reset();
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
            <Dialog.Content onInteractOutside={reset} onEscapeKeyDown={reset}
                className='fixed flex flex-col w-1/4 gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-white border rounded animate-fade-in top-1/3 left-1/2'>

                <Dialog.Title className='font-bold text-blue-600'>Update Email</Dialog.Title>
                <form id='emailform' className='flex flex-col gap-2' onSubmit={(e) => handleSubmit(e)}>

                    <LabelAndInput heading='Email' value={email} setter={setEmail} optional={false} />
                    <PasswordInput setText={setPassword} isVisible={passwordIsVisible} setVisibility={setPasswordIsVisible} />
                    <DialogButtons resetFunction={reset} />

                </form>


                {updateError && <ErrorMssg mssg={updateError} />}

            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default UpdateEmail