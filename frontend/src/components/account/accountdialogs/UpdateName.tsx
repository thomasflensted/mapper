import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../../../hooks/user-hooks/useAuthContext';
import { ErrorMssg } from '../../global-misc-general/ErrorAndSuccess';
import useUpdateUser from '../../../hooks/user-hooks/useUpdateUser';
import { DialogButtons, LabelAndInput } from '../../global-misc-general/FormComponents';

type ComponentProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<string>>,
}

const UpdateName = ({ setOpen, setSuccess }: ComponentProps) => {

    // hooks
    const { user } = useAuthContext();
    const { updateUserName, updateError, setUpdateError } = useUpdateUser();

    // state
    const [firstName, setFirstName] = useState<string>(user?.first_name || '');
    const [lastName, setLastname] = useState<string>(user?.last_name || '')

    const reset = () => {
        setOpen(false);
        setUpdateError('');
    }

    // update names
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await updateUserName(firstName, lastName);
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
                <Dialog.Title className='font-bold text-blue-600'>Update Name</Dialog.Title>
                <form id='nameform' onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>

                    <LabelAndInput heading='First name' value={firstName} setter={setFirstName} optional={false} />
                    <LabelAndInput heading='Last name' value={lastName} setter={setLastname} optional={true} />
                    <DialogButtons resetFunction={reset} />

                </form>

                {updateError && <ErrorMssg mssg={updateError} />}
            </Dialog.Content>
        </Dialog.Portal >
    )
}

export default UpdateName